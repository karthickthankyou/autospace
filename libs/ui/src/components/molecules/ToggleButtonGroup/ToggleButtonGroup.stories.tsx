import type { Meta, StoryObj } from '@storybook/react'
import { ToggleButton, ToggleButtonGroup } from './ToggleButtonGroup'
import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import { useState } from 'react'

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
}
export default meta

type Story = StoryObj<typeof ToggleButtonGroup>

export const Primary: Story = {
  render: () => {
    const [formats, setFormats] = useState(() => ['bold', 'italic'])
    const handleFormat = (
      event: React.MouseEvent<HTMLElement>,
      newFormats: string[],
    ) => {
      setFormats(newFormats)
    }

    return (
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton value="bold" aria-label="bold">
          <IconBold />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <IconItalic />
        </ToggleButton>
        <ToggleButton value="underlined" aria-label="underlined">
          <IconUnderline />
        </ToggleButton>
      </ToggleButtonGroup>
    )
  },
}
