import { Container, Stack, styled, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from '../components/common'
import { Todolist } from '../components/todolist/'
import { Header } from '../layout/header'

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 10,
    paddingRight: 10,
  },
}))

export type FilterT = 'all' | 'active' | 'completed'

type TodoListT = {
  id: string
  name: string
  filter: FilterT
}

export type TaskT = {
  id: string
  title: string
  isDone: boolean
}

type TasksT = {
  [todolistId: string]: TaskT[]
}

export const App = () => {
  //! ---------- additional data
  const todoListId1 = v1()
  const todoListId2 = v1()

  const filterOptions = {
    all: (tasks: TaskT[]) => tasks,
    completed: (tasks: TaskT[]) => tasks.filter(el => el.isDone),
    active: (tasks: TaskT[]) => tasks.filter(el => !el.isDone),
  }

  //! ---------- state
  const [todoLists, setTodoLists] = useState<TodoListT[]>([
    { id: todoListId1, name: 'What to learn', filter: 'all' },
    { id: todoListId2, name: 'What to byu', filter: 'all' },
  ])
  const [tasks, setTasks] = useState<TasksT>({
    [todoListId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Bread', isDone: true },
      { id: v1(), title: 'Butter', isDone: false },
      { id: v1(), title: 'Butter', isDone: false },
      { id: v1(), title: 'Butter', isDone: false },
    ],
  })

  //! ---------- change array todoLists
  const addTodoList = (name: string) => {
    const newTodoList: TodoListT = {
      id: v1(),
      name,
      filter: 'all',
    }
    const newTasks: TaskT[] = [{ id: v1(), title: 'New Task', isDone: false }]
    setTodoLists([...todoLists, newTodoList])
    setTasks({ ...tasks, [newTodoList.id]: newTasks })
  }
  const removeTodoList = (todolistId: string) => {
    const newTodoLists = todoLists.filter(el => el.id !== todolistId)
    setTodoLists(newTodoLists)
    delete tasks[todolistId]
  }
  const changeFilterTodoList = (todolistId: string, filter: FilterT) => {
    const newTodoLists = todoLists.map(el => (el.id === todolistId ? { ...el, filter } : el))
    setTodoLists(newTodoLists)
  }
  const changeTitleTodolist = (todoListId: string, name: string) => {
    const newTodoLists = todoLists.map(el => (el.id === todoListId ? { ...el, name } : el))
    setTodoLists(newTodoLists)
  }

  //! ---------- change array tasks
  const addTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const newTasks = [newTask, ...tasks[todolistId]]
    setTasks({ ...tasks, [todolistId]: newTasks })
  }
  const removeTask = (todolistId: string, taskId: string) => {
    const newTasks = tasks[todolistId].filter(el => el.id !== taskId)
    setTasks({ ...tasks, [todolistId]: newTasks })
  }

  //! ---------- change specific task
  const changeTaskIsDone = (todolistId: string, taskId: string, isDone: boolean) => {
    const newTasks = tasks[todolistId].map(el => (el.id === taskId ? { ...el, isDone } : el))
    setTasks({ ...tasks, [todolistId]: newTasks })
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    const newTasks = tasks[todolistId].map(el => (el.id === taskId ? { ...el, title } : el))
    setTasks({ ...tasks, [todolistId]: newTasks })
  }

  //! ---------- array Todolist components
  const todoListsArr = todoLists.map(el => {
    const currentTasks = filterOptions[el.filter](tasks[el.id])
    return (
      <Grid key={el.id} xl={3} lg={3} md={4} sm={6} xs={12}>
        <Todolist
          id={el.id}
          name={el.name}
          tasks={currentTasks}
          filterValue={el.filter}
          addTask={addTask}
          removeTask={removeTask}
          changeTaskIsDone={changeTaskIsDone}
          changeTaskTitle={changeTaskTitle}
          changeFilter={changeFilterTodoList}
          removeTodolist={removeTodoList}
          changeTitle={changeTitleTodolist}
        />
      </Grid>
    )
  })

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
          {todoListsArr}
        </Grid>
      </ResponsiveContainer>
    </>
  )
}
