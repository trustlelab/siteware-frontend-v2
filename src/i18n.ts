import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },
    ns: [
      'login', 
      'signup',
      'forgotPassword', 
      'sidebar', 
      'overview',
      'agents',
      'filter', 
      'createAgent',
      'agentCard',
      'configureAgent', 
      'tabs', 
      'agentConfig', 
      'llmConfigurator',
      'transcriberConfig',
      'voiceConfig',
      'callConfig',
      'functionsConfig',
      'tasksConfig',
      'profile',
      'phoneNumbers',
      'carousel'
    ],
    defaultNS: 'login',
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;
