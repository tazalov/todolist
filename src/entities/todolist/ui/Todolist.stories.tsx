import type { Meta, StoryObj } from '@storybook/react'

import { Todolist } from './Todolist'
import { useSelector } from 'react-redux'
import { getTodoListsState } from '../model/selectors/getTodoListsState'
import { useAppDispatch } from '../../../app/providers/store'
import { AddTodoList } from '../model/actions/todolist.actions'
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
  let todoLists = useSelector(getTodoListsState)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    if (!todoLists.length) {
      dispatch(AddTodoList('new todolist'))
    }
  })

  return !todoLists[0] ? <>Loading...</> : <Todolist todolist={todoLists[0]} />
}

export const Demo: Story = {
  render: () => <TodolistRedux />,
}

export const FilterAll: Story = {
  args: {
    todolist: { id: '1', title: 'New todolist', filter: 'all' },
  },
}

export const FilterActive: Story = {
  args: {
    todolist: { id: '1', title: 'New todolist', filter: 'active' },
  },
}

export const FilterCompleted: Story = {
  args: {
    todolist: { id: '1', title: 'New todolist', filter: 'completed' },
  },
}
