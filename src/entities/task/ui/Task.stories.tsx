import type { Meta, StoryObj } from '@storybook/react'
import { Task } from './Task'
import { useSelector } from 'react-redux'
import { getSpecificTasks } from '../model/selectors/tasks'
import { useAppDispatch } from 'app/providers/store'
import { AddTask } from '../model/actions/tasks.actions'
import { useLayoutEffect } from 'react'
import { TaskStatus, TaskPriority } from '../model/types/TasksSchema'

const meta: Meta<typeof Task> = {
  title: 'entities/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    task: {
      description: 'Object with task info',
      control: 'object',
    },
    todoListId: {
      description: 'Todolist id for current change status task',
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Task>

const TaskRedux = () => {
  const tasks = useSelector(getSpecificTasks('1'))
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    if (!tasks.length) {
      dispatch(AddTask('1', 'new task1'))
    }
  })

  return !tasks[0] ? <>Loading...</> : <Task todoListId={'1'} task={tasks[0]} />
}

export const TaskDemo: Story = {
  render: () => <TaskRedux />,
}

export const TaskIsDone: Story = {
  args: {
    task: {
      id: '1',
      title: 'CSS',
      status: TaskStatus.NEW,
      startDate: new Date(),
      todoListId: 'todolistId1',
      order: 0,
      priority: TaskPriority.LOW,
      description: '',
      deadline: new Date(),
      addedDate: new Date(),
    },
    todoListId: '1',
  },
}

export const TaskNotIsDone: Story = {
  args: {
    task: {
      id: '1',
      title: 'CSS',
      status: TaskStatus.NEW,
      startDate: new Date(),
      todoListId: 'todolistId1',
      order: 0,
      priority: TaskPriority.LOW,
      description: '',
      deadline: new Date(),
      addedDate: new Date(),
    },
    todoListId: '1',
  },
}
