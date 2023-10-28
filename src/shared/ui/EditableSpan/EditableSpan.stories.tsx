import Typography from '@mui/material/Typography'

import { EditableSpan } from './EditableSpan'

import type { Meta, StoryObj } from '@storybook/react'

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
  decorators: [
    (Story) => (
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
    disabled: false,
  },
}
