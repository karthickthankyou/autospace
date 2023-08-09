import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CompanyInfo } from './CompanyInfo'

export default {
  title: 'components/organisms/CompanyInfo',
  component: CompanyInfo,
} as ComponentMeta<typeof CompanyInfo>

const Template: ComponentStory<typeof CompanyInfo> = (args) => <CompanyInfo />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
