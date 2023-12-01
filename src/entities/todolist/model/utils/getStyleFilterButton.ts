import { Filter } from '../types/TodolistsSchema'

export const getStyleFilterButton = (currentFilter: Filter, targetFilter: Filter) => {
  return {
    bgcolor: currentFilter === targetFilter ? 'primary.dark' : 'primary.main',
    color: 'primary.contrastText',
  }
}
