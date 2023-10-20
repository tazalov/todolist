import type { Meta, StoryObj } from '@storybook/react';
import { AddItemForm } from './AddItemForm'


const meta: Meta<typeof AddItemForm> = {
  title: 'components/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
addItem: {
  description: 'Function for add item',
  action: 'item added!'
}
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const Demo: Story = {};
