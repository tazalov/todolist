import React, { useEffect, useState, ChangeEvent } from 'react'
import { todolistAPI } from './todolists.api'
import { TodoListT } from '../model/types/TodolistsSchema'
import { TextField, Button } from '@mui/material'

export default {
  title: 'API TODOLISTS',
}

export const GetTodolists = () => {
  const [state, setState] = useState<TodoListT[]>([])

  useEffect(() => {
    todolistAPI.getTodolists().then(response => setState(response.data))
  }, [])

  return (
    <div>
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

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [isSend, setIsSend] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  useEffect(() => {
    if (isSend) {
      todolistAPI.createTodolist(title).then(response => setState(response.data))
    }
    setIsSend(false)
  }, [isSend])

  return (
    <>
      <div>response : {JSON.stringify(state)}</div>
      <div>
        <TextField variant="standard" value={title} onChange={handleChange} />
        <Button onClick={() => setIsSend(true)}>CREATE</Button>
      </div>
    </>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todoLists, setTodoLists] = useState<string[]>([])
  const [isSend, setIsSend] = useState(false)

  useEffect(() => {
    todolistAPI.getTodolists().then(response => setTodoLists(response.data.map(el => el.id)))
    if (isSend) {
      todolistAPI.deleteTodolist(todoLists[0]).then(response => setState(response.data))
    }
    setIsSend(false)
  }, [isSend])

  return (
    <>
      <div>{JSON.stringify(todoLists)}</div>
      <div>response : {JSON.stringify(state)}</div>
      <Button onClick={() => setIsSend(true)}>DELETE FIRST</Button>
    </>
  )
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [firstTodolist, setFirstTodolist] = useState<TodoListT | null>(null)
  const [title, setTitle] = useState('')
  const [isSend, setIsSend] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  useEffect(() => {
    todolistAPI.getTodolists().then(response => setFirstTodolist(response.data[response.data.length - 1]))
    if (isSend && firstTodolist) {
      todolistAPI.updateTodolist(firstTodolist.id, title).then(response => setState(response.data))
    }
    setIsSend(false)
  }, [isSend])

  return (
    <>
      <div>first todolist: {JSON.stringify(firstTodolist)}</div>
      <div>response : {JSON.stringify(state)}</div>
      <div>
        <TextField variant="standard" value={title} onChange={handleChange} />
        <Button onClick={() => setIsSend(true)}>UPDATE TITLE FOR FIRST</Button>
      </div>
    </>
  )
}
