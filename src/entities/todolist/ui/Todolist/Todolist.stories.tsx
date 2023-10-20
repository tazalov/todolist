import type { Meta, StoryObj } from '@storybook/react'

import { Todolist } from './Todolist'
import { useSelector } from 'react-redux'
import { getTodolists } from '../../model/selectors/todolists'
import { useAppDispatch } from '../../../../app/providers/store'
import { AddTodoList } from '../../model/actions/todolist.actions'
import { useLayoutEffect } from 'react'

const meta: Meta<typeof Todolist> = {
  title: 'entities/Todolist',
  component: Todolist,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todolist: {
      description: 'Object with todolist info',
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof Todolist>

const TodolistRedux = () => {
  const todoLists = useSelector(getTodolists)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    if (!todoLists.length) {
      dispatch(
        AddTodoList({
          id: 'asd',
          title: 'new title todolist',
          order: 0,
          addedDate: new Date(2023, 0, 1, 0, 0, 0, 0),
        }),
      )
    }
  })

  return !todoLists[0] ? <>Loading...</> : <Todolist todolist={todoLists[0]} />
}

export const Demo: Story = {
  render: () => <TodolistRedux />,
}

export const FilterAll: Story = {
  args: {
    todolist: { id: '1', title: 'New todolist', filter: 'all', order: 0, addedDate: new Date() },
  },
}

export const FilterActive: Story = {
  args: {
    todolist: { id: '1', title: 'New todolist', filter: 'active', order: 0, addedDate: new Date() },
  },
}

export const FilterCompleted: Story = {
  args: {
    todolist: {
      id: '1',
      title: 'New todolist',
      filter: 'completed',
      order: 0,
      addedDate: new Date(),
    },
  },
}
