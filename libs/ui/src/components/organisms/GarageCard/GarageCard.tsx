import {
  GaragesQuery,
  MyCompanyQuery,
} from '@autospace-org/network/src/generated'
import { AutoImageChanger } from '../../molecules/AutoImageChanger'

export interface IGarageCardProps {
  garage: GaragesQuery['garages'][number]
}

export const GarageCard = ({ garage }: IGarageCardProps) => {
  return (
    <div className="overflow-hidden ">
      <AutoImageChanger images={garage.images || []} durationPerImage={2000} />

      <h3 className="font-semibold ">{garage.displayName}</h3>
      <p className="text-gray-500 ">{garage.description}</p>
      <p className="text-sm text-gray-400">Address: {garage.address.address}</p>
    </div>
  )
}
