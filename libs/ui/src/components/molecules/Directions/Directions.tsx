import { LatLng } from '@autospace-org/types'
import { IconGps } from '@tabler/icons-react'
import { PlainButton } from '../../atoms/PlainButton'

export const Directions = ({ start, end }: { start: LatLng; end: LatLng }) => {
  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}`
    window.open(url, '_blank')
  }

  return (
    <PlainButton onClick={handleDirectionsClick}>
      <IconGps />
    </PlainButton>
  )
}
