import { Container, Stack, styled, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { AddItemForm } from 'components'
import { Header } from 'layout/header'
import { useApp } from '../utils/hooks/useApp/useApp'

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

export const App = () => {
  const { todoListsArray, addTodoList } = useApp()

  return (
    <>
      <Header />
      <ResponsiveContainer fixed>
        <Grid container sx={{ pt: '40px', pb: '40px' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ bgcolor: 'background.blocks', boxShadow: 5, p: 1, width: '100%' }}
          >
            <Typography variant="h6">CREATE NEW TODOLIST</Typography>
            <AddItemForm addItem={addTodoList} />
          </Stack>
        </Grid>
        <Grid container spacing={2}>
          {todoListsArray}
        </Grid>
      </ResponsiveContainer>
    </>
  )
}
