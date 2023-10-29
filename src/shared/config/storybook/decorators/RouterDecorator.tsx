import { StoryFn } from '@storybook/react'
import { HashRouter } from 'react-router-dom'

export const RouterDecorator = (Story: StoryFn) => (
  <HashRouter>
    <Story />
  </HashRouter>
)
