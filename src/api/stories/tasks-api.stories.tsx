import React, { useEffect, useState, ChangeEvent } from 'react'
import { tasksAPI } from '../config/tasks.api'
import { TextField, Button } from '@mui/material'
import { TaskT } from 'entities/task'

export default {
  title: 'API TASKS',
}

const todolistId = '4b2337cc-0df3-4505-9498-6636e34d61c9'

export const GetTasks = () => {
  const [state, setState] = useState<TaskT[]>([])

  useEffect(() => {
    tasksAPI.getTasks(todolistId).then(response => setState(response.data.items))
  }, [])

  return (
    <div>
      <div>todolist id : {todolistId}</div>
      {state.map(el => {
        return (
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>todo id: {el.id}</div>
            <div>title: {el.title}</div>
          </div>
        )
      })}
    </div>
  )
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [isSend, setIsSend] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  useEffect(() => {
    if (isSend) {
      tasksAPI.createTask(todolistId, title).then(response => setState(response.data))
    }
    setIsSend(false)
  }, [isSend])

  return (
    <>
      <div>todolist id : {todolistId}</div>
      <div>response : {JSON.stringify(state)}</div>
      <div>
        <TextField variant="standard" value={title} onChange={handleChange} />
        <Button onClick={() => setIsSend(true)}>CREATE</Button>
      </div>
    </>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [tasks, setTasks] = useState<string[]>([])
  const [isSend, setIsSend] = useState(false)

  useEffect(() => {
    tasksAPI.getTasks(todolistId).then(response => setTasks(response.data.items.map(el => el.id)))
    if (isSend) {
      tasksAPI.deleteTask(todolistId, tasks[0]).then(response => setState(response.data))
    }
    setIsSend(false)
  }, [isSend])

  return (
    <>
      <div>todolist id : {todolistId}</div>
      <div>{JSON.stringify(tasks)}</div>
      <div>response : {JSON.stringify(state)}</div>
      <Button onClick={() => setIsSend(true)}>DELETE FIRST</Button>
    </>
  )
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [firstTask, setFirstTask] = useState<TaskT | null>(null)
  const [title, setTitle] = useState('')
  const [isSend, setIsSend] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  useEffect(() => {
    tasksAPI
      .getTasks(todolistId)
      .then(response => setFirstTask(response.data.items[response.data.items.length - 1]))
    if (isSend && firstTask) {
      tasksAPI
        .updateTaskTitle(todolistId, firstTask.id, title)
        .then(response => setState(response.data))
    }
    setIsSend(false)
  }, [isSend])

  return (
    <>
      <div>todolist id : {todolistId}</div>
      <div>first task: {JSON.stringify(firstTask)}</div>
      <div>response : {JSON.stringify(state)}</div>
      <div>
        <TextField variant="standard" value={title} onChange={handleChange} />
        <Button onClick={() => setIsSend(true)}>UPDATE TITLE FOR FIRST</Button>
      </div>
    </>
  )
}
