import { i18n } from 'next-i18next';
import { useEffect, useState } from 'react';
const useIsJa = (): boolean => {
  const [language, setLanguage] = useState(i18n?.language);
  useEffect(() => {
    i18n.on('languageChanged', setLanguage);
  }, []);
  return language === 'ja';
};

export default useIsJa;
