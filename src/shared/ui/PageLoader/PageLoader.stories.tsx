import { PageLoader } from './PageLoader'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PageLoader> = {
  title: 'shared/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof PageLoader>

export const Demo: Story = {}
