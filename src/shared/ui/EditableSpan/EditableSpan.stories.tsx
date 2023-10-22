import { Typography } from '@mui/material'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { EditableSpan } from './EditableSpan'

const EditableSpanDecorator = (Story: StoryFn) => (
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
)

const meta: Meta<typeof EditableSpan> = {
  title: 'shared/EditableSpan',
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
    disabled: {
      description: 'Flag to prohibit editing',
      control: 'boolean',
    },
    changeTitle: {
      description: 'Function for change current title span',
      action: 'title changed!',
    },
  },
  decorators: [EditableSpanDecorator],
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const Demo: Story = {
  args: {
    title: 'title editable span',
    disabled: false,
  },
  decorators: [],
}
