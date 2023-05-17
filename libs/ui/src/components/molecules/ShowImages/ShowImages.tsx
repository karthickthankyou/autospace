import Image from 'next/image'
import { AutoImageChanger } from '../AutoImageChanger'

export interface IShowImagesProps {
  images: string[]
}

export const ShowImages = ({ images }: IShowImagesProps) => {
  return <AutoImageChanger images={images || []} durationPerImage={5} />

  return (
    <div className="grid grid-cols-3 gap-1">
      {images.map((image) => (
        <Image
          className="object-cover w-full h-full"
          width={200}
          height={200}
          key={image}
          src={image}
          alt=""
        />
      ))}
    </div>
  )
}
