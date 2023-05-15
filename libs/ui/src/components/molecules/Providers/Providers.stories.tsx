import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Providers } from './Providers'

export default {
  title: 'src/components/molecules/Providers',
  component: Providers,
} as ComponentMeta<typeof Providers>

const Template: ComponentStory<typeof Providers> = (args) => (
  <Providers {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
