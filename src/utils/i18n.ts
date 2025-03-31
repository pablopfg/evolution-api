import { ConfigService, Language } from '@config/env.config';
import fs from 'fs';
import i18next from 'i18next';
import path from 'path';

// Reordenando para colocar o português como primeira opção
const languages = ['pt-BR', 'en', 'es'];
const translationsPath = path.join(__dirname, 'translations');
const configService: ConfigService = new ConfigService();

// Função para obter o idioma com fallback para pt-BR
const getLanguage = (): Language => {
  const configLang = configService.get<Language>('LANGUAGE');
  return configLang || 'pt-BR';
};

const resources: any = {};
languages.forEach((language) => {
  const languagePath = path.join(translationsPath, `${language}.json`);
  if (fs.existsSync(languagePath)) {
    resources[language] = {
      translation: require(languagePath),
    };
  }
});

i18next.init({
  resources,
  // Definindo português como fallback
  fallbackLng: 'pt-BR',
  // Usando a função para garantir que tenha pt-BR como padrão
  lng: getLanguage(),
  debug: false,
  // Configuração opcional para preferência de línguas
  load: 'languageOnly',
  // Ordem de preferência para línguas
  supportedLngs: languages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;