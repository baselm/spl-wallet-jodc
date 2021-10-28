import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANSLATIONS_AR } from "./arabic/translations";
import { TRANSLATIONS_EN } from "./english/translations";
 
i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     English: {
       translation: TRANSLATIONS_EN
     },
     Arabic: {
       translation: TRANSLATIONS_AR
     }
   }
 });
 
i18n.changeLanguage("English");