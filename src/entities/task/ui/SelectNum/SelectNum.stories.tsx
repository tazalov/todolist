import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { SelectNum } from './SelectNum'
import { editMenuStatusItems, editMenuPriorityItems } from '../../model/const/editMenuItems'
import { tasksStatus, tasksPriority } from '../../model/const/colorsEditMenuItems'

const SelectDecorator = (Story: StoryFn) => (
  <div style={{ width: '150px' }}>
    <Story />
  </div>
)

const meta: Meta<typeof SelectNum> = {
  title: 'entities/Task/SelectNum',
  component: SelectNum,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of objects {value: number, name: string} for select options',
      control: 'object',
    },
    label: {
      description: 'Label for select',
      control: 'text',
    },
    colors: {
      description: 'Object with names color in MUI theme palette',
      control: false,
    },
  },
  decorators: [SelectDecorator],
}

export default meta
type Story = StoryObj<typeof SelectNum>

export const SelectStatus: Story = {
  args: {
    options: editMenuStatusItems,
    colors: tasksStatus,
    label: 'Status',
  },
}

export const SelectPriority: Story = {
  args: {
    options: editMenuPriorityItems,
    colors: tasksPriority,
    label: 'Priority',
  },
}
