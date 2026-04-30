import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Representative from '../models/Representative.js';
import User from '../models/User.js';
import { useLocalDB } from './dbProvider.js';

const models = {
  Activity,
  Representative,
  User
};

/**
 * Returns a model-like object that either uses Mongoose (if connected)
 * or a Local JSON fallback (if not).
 */
export const getModel = (name) => {
  const isConnected = mongoose.connection.readyState === 1;
  
  if (isConnected) {
    return models[name];
  } else {
    // Fallback to local JSON implementation
    return useLocalDB(name);
  }
};
