import { FilterT } from '../types/TodolistsSchema'

export const getStyleFilterButton = (currentFilter: FilterT, targetFilter: FilterT) => {
  return {
    bgcolor: currentFilter === targetFilter ? 'primary.dark' : 'primary.main',
    color: 'secondary.contrastText',
  }
}
