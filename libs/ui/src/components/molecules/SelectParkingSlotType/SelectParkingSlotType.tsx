import {
  SearchGaragesQuery,
  SlotType,
} from '@autospace-org/network/src/generated'
import { RadioGroup } from '@headlessui/react'
import { IconBike, IconCar, IconMotorbike, IconTir } from '@tabler/icons-react'

export interface ISelectParkingSlotTypeProps {
  availableSlots: SearchGaragesQuery['searchGarages'][0]['availableSlots']
}
export const IconTypes = {
  [SlotType.Bicycle]: <IconBike className="w-6 h-6 " />,
  [SlotType.Bike]: <IconMotorbike className="w-6 h-6 " />,
  [SlotType.Car]: <IconCar className="w-6 h-6 " />,
  [SlotType.Heavy]: <IconTir className="w-6 h-6 " />,
}
export const RadioOptionsSelectParkingSlotType = ({
  availableSlots,
}: ISelectParkingSlotTypeProps) => {
  return (
    <>
      {availableSlots.map((slot) => (
        <div
          key={slot.type}
          className="flex flex-wrap items-center gap-2 bg-white"
        >
          <RadioGroup.Option key={slot.type} value={slot.type}>
            {({ checked }) => (
              <div
                className={`cursor-default border-2 p-2 ${
                  checked ? 'border-yellow-500 shadow-md' : 'border-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {slot.type ? IconTypes[slot.type] : null}
                  <div>
                    <span className="text-lg font-bold">
                      {slot.pricePerHour}
                    </span>
                    /hr
                  </div>
                </div>

                <div className="text-gray-600">{slot.count} slots</div>
              </div>
            )}
          </RadioGroup.Option>
        </div>
      ))}
    </>
  )
}
