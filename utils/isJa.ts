export const isJa =
  typeof window !== 'undefined'
    ? window.navigator.language.startsWith('ja')
    : true;

const woori =
  typeof window !== 'undefined' && window.navigator['browserLanguage'];

console.log(woori);
