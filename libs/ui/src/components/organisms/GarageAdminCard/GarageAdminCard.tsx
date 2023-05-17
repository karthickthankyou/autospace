import { GaragesQuery } from '@autospace-org/network/src/generated'
import { MapLink } from '../../atoms/MapLink'
import { IconTypes } from '../../molecules/SelectParkingSlotType/SelectParkingSlotType'

type GarageAdminCardProps = {
  garage: GaragesQuery['garages'][number]
}

export const GarageAdminCard: React.FC<GarageAdminCardProps> = ({ garage }) => {
  return (
    <>
      <p className="text-xs ">#{garage.id}</p>
      <div className="flex items-start gap-2">
        <h2 className="mb-1 text-2xl font-bold">{garage.displayName}</h2>
        <div>
          {garage.verification?.verified ? (
            <span className="px-1 py-0.5 shadow text-xs bg-green-50 ">
              Verified
            </span>
          ) : (
            <span className="px-1 py-0.5 shadow text-xs bg-red-50 ">
              Not Verified
            </span>
          )}
        </div>
      </div>
      {/* <p className="text-sm text-gray-500 ">{garage.description}</p> */}
      <div className="flex items-center gap-2">
        <MapLink lat={garage.address.lat} lng={garage.address.lng} />
        <p className="text-sm font-medium text-gray-700 ">
          {garage.address.address}
        </p>
      </div>

      <div className="mt-2 mb-4 ">
        {garage.slotCounts.length === 0 ? (
          <div className="text-sm ">No slots.</div>
        ) : null}
        {garage.slotCounts.map((slot, index) => (
          <div key={index} className="flex gap-2 ">
            {IconTypes[slot.type]}
            <span className="text-gray-500">{slot.count}</span>
          </div>
        ))}
      </div>
    </>
  )
}
