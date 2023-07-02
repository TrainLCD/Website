import useTranslation from 'next-translate/useTranslation';

const useIsJa = (): boolean => {
  const { lang } = useTranslation();
  return lang === 'ja';
};

export default useIsJa;
