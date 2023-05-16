import { IconMap, IconMap2 } from '@tabler/icons-react'
import Link from 'next/link'

export interface IMapLinkProps {}

export const MapLink = ({ lat, lng }: { lat: number; lng: number }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

  return (
    <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
      <IconMap2 />
    </Link>
  )
}
