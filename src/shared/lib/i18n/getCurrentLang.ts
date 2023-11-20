export const getCurrentLang = () => {
  const currentLang = localStorage.getItem('i18nextLng')

  return currentLang === 'ru' ? 'ru' : 'en'
}
