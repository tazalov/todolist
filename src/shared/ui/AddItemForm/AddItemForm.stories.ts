import { AddItemForm } from './AddItemForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AddItemForm> = {
  title: 'shared/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Function for add item',
      action: 'item added!',
    },
    disabled: {
      description: 'Flag for disable form & button',
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const Demo: Story = {}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
