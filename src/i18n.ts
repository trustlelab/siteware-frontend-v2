import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // For loading translation files from a backend (e.g., from locales folder)
  .use(LanguageDetector) // To detect the user's language
  .use(initReactI18next) // To integrate with React
  .init({
    fallbackLng: 'en', // Default language if the detected language is not available
    supportedLngs: ['en', 'de'], // The languages your app supports
    debug: true, // Set this to false in production to avoid logging debug info
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    backend: {
      // This ensures it loads the merged JSON files for each language
      loadPath: '/locales/{{lng}}.json', // Path to the merged language files
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator'], // Detect language in this order
      caches: ['cookie', 'localStorage'], // Save the detected language in these places
    },
    react: {
      useSuspense: false, // If you don't want to use React suspense
    },
  });

export default i18n;
