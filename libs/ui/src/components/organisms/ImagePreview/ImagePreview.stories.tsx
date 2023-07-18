import type { Meta, StoryObj } from '@storybook/react'
import { ImagePreview } from './ImagePreview'
import { Controller } from 'react-hook-form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useState } from 'react'

const meta: Meta<typeof ImagePreview> = {
  component: ImagePreview,
}
export default meta

type Story = StoryObj<typeof ImagePreview>

export const Primary: Story = {
  render: (args) => {
    const [image, setImage] = useState<Blob | MediaSource | undefined>()
    return (
      <ImagePreview src={image} clearImage={() => setImage(undefined)}>
        <HtmlInput
          type="file"
          accept="image/*"
          multiple={false}
          onChange={(e) => setImage(e?.target?.files?.[0])}
        />
      </ImagePreview>
    )
  },
}
