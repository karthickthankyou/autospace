import { IconTrash } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { PlainButton } from '../../atoms/PlainButton'

export interface IImageUploadProps {
  src?: Blob | MediaSource
  clearImage: () => void
  children: ReactNode
}

export const ImagePreview = ({
  src,
  clearImage,
  children,
}: IImageUploadProps) => {
  if (src) {
    return (
      <div className="relative flex items-center justify-center w-full h-full min-h-[12rem]">
        <PlainButton
          className="flex items-center gap-1 p-2 text-white underline underline-offset-4 bg-black/30"
          onClick={clearImage}
        >
          <IconTrash /> Clear
        </PlainButton>
        <img
          className="absolute object-cover h-full z-full -z-10"
          alt=""
          src={URL.createObjectURL(src)}
        />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-full h-full  min-h-[12rem] bg-gray-100">
      {children}
    </div>
  )
}
