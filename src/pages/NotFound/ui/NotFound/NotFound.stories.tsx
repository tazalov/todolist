import NotFound from './NotFound'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NotFound> = {
  title: 'pages/NotFound',
  component: NotFound,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof NotFound>

export const Demo: Story = {}
