import { Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { EditableSpan } from './EditableSpan'

const meta: Meta<typeof EditableSpan> = {
  title: 'components/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Current title span',
      control: 'text',
    },
    changeTitle: {
      description: 'Function for change current title span',
      action: 'title changed!',
    },
  },
  decorators: [
    Story => (
      <Typography
        variant={'h6'}
        sx={{
          height: '1.5em',
          display: 'inline-flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Story />
      </Typography>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const Demo: Story = {
  args: {
    title: 'title editable span',
  },
}
