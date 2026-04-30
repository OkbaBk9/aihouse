import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'home',
    discover: 'discover',
    blogs: 'blogs',
    news: 'news',
    login: 'log in',
    signup: 'sign up',
    hero_title: 'the house of artificial intelligence.',
    hero_subtitle: 'a strategic initiative by the university of blida 1, inviting all students and researchers to participate in the "university 4.0" transition. we transform ai into your personal intelligent assistant through prompt engineering, notebookLm, and study efficiency tools.',
    join_btn: 'join the ecosystem',
    discover_btn: 'discover ai house',
    reps_title: 'members of the ai house',
    news_title: 'latest news',
    blogs_title: 'blogs & insights',
    contact_us: 'contact us',
    footer_text: 'university of blida 1',
    welcome: 'welcome',
    role: 'role'
  },
  ar: {
    home: 'الرئيسية',
    discover: 'اكتشف',
    blogs: 'المدونات',
    news: 'الأخبار',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    hero_title: 'دار الذكاء الاصطناعي',
    hero_subtitle: 'مبادرة استراتيجية من جامعة البليدة 1، تدعو جميع الطلبة والباحثين للمشاركة في الانتقال نحو "الجامعة 4.0". نقوم بتحويل الذكاء الاصطناعي إلى مساعدك الذكي الشخصي من خلال هندسة الأوامر و NotebookLm وأدوات كفاءة الدراسة.',
    join_btn: 'انضم إلى النظام البيئي',
    discover_btn: 'اكتشف دار الذكاء الاصطناعي',
    reps_title: 'أعضاء دار الذكاء الاصطناعي',
    news_title: 'آخر الأخبار',
    blogs_title: 'المدونات والرؤى',
    contact_us: 'اتصل بنا',
    footer_text: 'جامعة البليدة 1',
    welcome: 'مرحباً',
    role: 'الدور'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, isChanging }}>
      <div className={isChanging ? 'switching-animation' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
