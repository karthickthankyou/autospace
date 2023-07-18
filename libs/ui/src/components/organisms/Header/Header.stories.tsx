import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'
import { MenuItem } from '@autospace-org/types'

const meta: Meta<typeof Header> = {
  component: Header,
}
export default meta

type Story = StoryObj<typeof Header>

const MENUITEMS: MenuItem[] = [
  { label: 'Wishlist', href: '/wishlist', loggedIn: false },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Cart', href: '/cart', loggedIn: false },
  { label: 'Purchased', href: '/purchased', loggedIn: true },
  { label: 'Settings', href: '/settings', loggedIn: false },
]

export const Primary: Story = {
  args: {
    menuItems: MENUITEMS,
    sideMenuItems: SUBMENUITEMS,
  },
}

export const AdminHeader: Story = {
  args: {
    menuItems: MENUITEMS,
    sideMenuItems: SUBMENUITEMS,
    type: 'admin',
  },
}

export const ValetHeader: Story = {
  args: {
    menuItems: MENUITEMS,
    sideMenuItems: SUBMENUITEMS,
    type: 'valet',
  },
}
