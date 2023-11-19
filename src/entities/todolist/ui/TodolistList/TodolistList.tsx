import { Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useMemo, memo, FC } from 'react'

import { useTranslation } from 'react-i18next'

import { UpdatedTodoListT } from '../../model/types/TodolistsSchema'
import { Todolist } from '../Todolist/Todolist'

import { TodolistSkeleton } from '../Todolist/TodolistSkeleton'

interface TodolistListPT {
  demo?: boolean
  todoLists: UpdatedTodoListT[]
  isLoading: boolean
}

export const TodolistList: FC<TodolistListPT> = memo(({ demo = false, todoLists, isLoading }) => {
  const { t } = useTranslation()

  const skeletonsTodoLists = useMemo(() => new Array(3).fill(0).map((_, i) => <TodolistSkeleton key={i} />), [])

  const todoListsArray = useMemo(
    () =>
      todoLists.map((el) => {
        return (
          <Grid key={el.id} lg={4} md={6} sm={12}>
            <Todolist todolist={el} demo={demo} />
          </Grid>
        )
      }),
    [todoLists],
  )

  const todoListsNotExist = todoLists.length === 0 && !isLoading

  return (
    <Grid container spacing={2}>
      {todoLists.length > 0 && todoListsArray}
      {todoListsNotExist && (
        <Typography align={'center'} variant={'h3'} sx={{ width: '100%' }}>
          {t('There are no TodoLists yet. Create your first list!')}
        </Typography>
      )}
      {isLoading && skeletonsTodoLists}
    </Grid>
  )
})
