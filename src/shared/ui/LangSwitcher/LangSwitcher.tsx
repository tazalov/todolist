import { Button } from '@mui/material'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export const LangSwitcher = memo(() => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = async () => i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')

  return (
    <Button sx={{ color: 'secondary.contrastText' }} onClick={toggleLanguage}>
      {t('Lang')}
    </Button>
  )
})
