import React, { useEffect, useState, ChangeEvent } from 'react'
import { tasksAPI } from './tasks.api'
import { TextField, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { TaskT, TaskStatus, TaskPriority } from '../model/types/TasksSchema'

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

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [firstTask, setFirstTask] = useState<TaskT | null>(null)
  const [isSend, setIsSend] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>(0)
  const [priority, setPriority] = useState<TaskPriority>(0)

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(+e.target.value)
  }

  const handleChangePriority = (e: SelectChangeEvent) => {
    setPriority(+e.target.value)
  }

  useEffect(() => {
    tasksAPI
      .getTasks(todolistId)
      .then(response => setFirstTask(response.data.items[response.data.items.length - 1]))
    if (isSend && firstTask) {
      const model = {
        description,
        title,
        status,
        priority,
        startDate: new Date(),
        deadline: new Date(),
      }
      tasksAPI.updateTask(todolistId, firstTask.id, model).then(response => setState(response.data))
    }
    setIsSend(false)
  }, [isSend])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>todolist id : {todolistId}</div>
      <div>first task: {JSON.stringify(firstTask)}</div>
      <div>response : {JSON.stringify(state)}</div>
      <div>
        <TextField placeholder={'title'} variant="outlined" value={title} onChange={handleChangeTitle} />
      </div>
      <div>
        <TextField
          placeholder={'description'}
          variant="outlined"
          value={description}
          onChange={handleChangeDescription}
        />
      </div>
      <div>
        <Select value={status + ''} label="Status" onChange={handleChangeStatus}>
          <MenuItem value={0}>NEW</MenuItem>
          <MenuItem value={1}>IN_PROGRESS</MenuItem>
          <MenuItem value={2}>COMPLETED</MenuItem>
          <MenuItem value={3}>DRAFT</MenuItem>
        </Select>
      </div>
      <div>
        <Select value={priority + ''} label="Status" onChange={handleChangePriority}>
          <MenuItem value={0}>LOW</MenuItem>
          <MenuItem value={1}>MIDDLE</MenuItem>
          <MenuItem value={2}>HIGH</MenuItem>
          <MenuItem value={3}>URGENTLY</MenuItem>
          <MenuItem value={4}>LATER</MenuItem>
        </Select>
      </div>
      <div>
        <Button onClick={() => setIsSend(true)}>UPDATE FIRST</Button>
      </div>
    </div>
  )
}
