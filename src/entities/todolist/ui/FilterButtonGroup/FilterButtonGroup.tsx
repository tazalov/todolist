import { ButtonGroup, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Filter } from '../../model/types/TodolistsSchema'
import { getStyleFilterButton } from '../../model/utils/getStyleFilterButton'

type Props = {
  filter: Filter
  changeFilter: (filter: Filter) => () => void
}

export const FilterButtonGroup = ({ filter, changeFilter }: Props) => {
  const { t } = useTranslation()

  return (
    <ButtonGroup size='small' variant='contained' disableElevation>
      <Button sx={getStyleFilterButton(filter, 'all')} onClick={changeFilter('all')}>
        {t('ALL')}
      </Button>
      <Button sx={getStyleFilterButton(filter, 'active')} onClick={changeFilter('active')}>
        {t('ACTIVE')}
      </Button>
      <Button sx={getStyleFilterButton(filter, 'completed')} onClick={changeFilter('completed')}>
        {t('COMPLETED')}
      </Button>
    </ButtonGroup>
  )
}
