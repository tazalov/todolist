import { Box, Grid } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from '../components/common'
import { Todolist } from '../components/todolist/Todolist'
import { Header } from '../layout/header'

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
      <Grid item key={el.id} xs={3}>
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
      <Container fixed>
        <Grid container sx={{ pt: '40px', pb: '40px' }}>
          <Box
            sx={{
              p: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 5,
              bgcolor: 'background.blocks',
            }}
          >
            <Typography variant="h6">CREATE NEW TODOLIST</Typography>
            <AddItemForm addItem={addTodoList} />
          </Box>
        </Grid>
        <Grid spacing={5} container>
          {todoListsArr}
        </Grid>
      </Container>
    </>
  )
}
