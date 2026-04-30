import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'local_db.json');

// Initialize local JSON DB if missing
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    users: [],
    activities: [],
    representatives: []
  }, null, 2));
}

/**
 * A tiny wrapper that mimics Mongoose basic behavior but saves to a JSON file.
 * This is a fallback for when MongoDB is not installed locally.
 */
export const useLocalDB = (modelName) => {
  const collectionName = modelName.toLowerCase() + 's';
  
  const getData = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  const saveData = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  return {
    find: async (filter = {}) => {
      const data = getData()[collectionName] || [];
      return data.filter(item => {
        for (let key in filter) {
          if (filter[key] !== item[key]) return false;
        }
        return true;
      });
    },
    findById: async (id) => {
      const data = getData()[collectionName] || [];
      return data.find(item => item._id === id);
    },
    create: async (doc) => {
      const data = getData();
      if (!data[collectionName]) data[collectionName] = [];
      const newDoc = { ...doc, _id: Date.now().toString(), created_at: new Date() };
      data[collectionName].push(newDoc);
      saveData(data);
      return newDoc;
    },
    findByIdAndUpdate: async (id, update) => {
      const data = getData();
      const index = data[collectionName].findIndex(item => item._id === id);
      if (index === -1) return null;
      data[collectionName][index] = { ...data[collectionName][index], ...update, updated_at: new Date() };
      saveData(data);
      return data[collectionName][index];
    },
    deleteMany: async () => {
      const data = getData();
      data[collectionName] = [];
      saveData(data);
    },
    insertMany: async (docs) => {
      const data = getData();
      if (!data[collectionName]) data[collectionName] = [];
      const newDocs = docs.map(d => ({ ...d, _id: Math.random().toString(36).substr(2, 9), created_at: new Date() }));
      data[collectionName].push(...newDocs);
      saveData(data);
      return newDocs;
    }
  };
};

export const connectDB = async (mongoUri) => {
  try {
    console.log('🔗 Attempting to connect to MongoDB...');
    // Set a short timeout so it doesn't hang the app if Mongo is missing
    await mongoose.connect(mongoUri, { 
      serverSelectionTimeoutMS: 2000 
    });
    console.log('📦 Connected to MongoDB Successfully');
    return true;
  } catch (error) {
    console.warn('⚠️  MongoDB Connection Failed. Falling back to Local JSON DB.');
    console.warn('Reason:', error.message);
    return false;
  }
};
