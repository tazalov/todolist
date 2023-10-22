import { Container, Stack, styled, Box, Chip } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useSelector } from 'react-redux'
import { getTodolists, fetchTodoLists, Todolist, CreateTodolistForm } from 'entities/todolist'
import { useAppDispatch } from './providers/store'
import { useEffect } from 'react'
import { Header } from 'widgets/Header'
import { ErrorSnackbar } from 'entities/notification'

const hints = [
  { value: 'New', color: 'background.paper' },
  { value: 'In progress', color: 'IN_PROGRESS.main' },
  { value: 'Completed', color: 'COMPLETED.main' },
  { value: 'Draft', color: 'DRAFT.main' },
]

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

export const App = () => {
  // TODO сделать страницу TodoListsListPage, где будем рендерить список тудулистов и вся логика уйдет туда
  const todoLists = useSelector(getTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodoLists())
  }, [])

  const todoListsArray = todoLists.map(el => {
    return (
      <Grid key={el.id} lg={4} md={6} sm={12}>
        <Todolist todolist={el} />
      </Grid>
    )
  })

  return (
    <>
      <Header />
      <ResponsiveContainer fixed>
        <Grid container sx={{ pt: '40px', pb: '40px' }}>
          <Box sx={{ bgcolor: 'background.blocks', boxShadow: 5, width: '100%' }}>
            <CreateTodolistForm />
            <Stack gap={1} direction={{ xs: 'column', sm: 'row' }} justifyContent={'center'} sx={{ p: 1 }}>
              {hints.map(el => (
                <Chip
                  key={el.value}
                  label={el.value}
                  sx={{
                    backgroundColor: el.color,
                    border: '1px solid',
                    borderColor: 'text.primary',
                    opacity: el.value === 'Draft' ? 0.5 : 1,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          {todoListsArray}
        </Grid>
      </ResponsiveContainer>
      <ErrorSnackbar />
    </>
  )
}
