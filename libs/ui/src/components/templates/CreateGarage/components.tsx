import { FormTypeCreateGarage } from '@autospace-org/forms/src/createGarage'
import { useState } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { Button } from '../../atoms/Button'

import { SlotType } from '@autospace-org/network/src/generated'
import { IconPlus } from '@tabler/icons-react'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlSelect } from '../../atoms/HtmlSelect'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { Accordion } from '../../molecules/Accordion'
import { AutoImageChanger } from '../../molecules/AutoImageChanger'
import { Marker } from '../../organisms/Map/MapMarker'

export const AddSlots = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateGarage>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `slotTypes`,
  })

  const { slotTypes } = useWatch<FormTypeCreateGarage>()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div>
      {fields.map((item, slotIndex) => (
        <Accordion
          title={slotTypes?.[slotIndex]?.type || '[Empty]'}
          key={item.id}
          className={item.id}
          defaultOpen
        >
          <div className={`flex justify-end my-2`}>
            <Button
              variant="text"
              size="none"
              className="text-xs text-gray-600 underline underline-offset-2"
              onClick={() => {
                remove(slotIndex)
              }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(item.id)}
              onBlur={() => setHovered(null)}
            >
              remove slot type
            </Button>
          </div>

          <div
            className={`flex flex-col gap-2 ${
              hovered === item.id ? 'bg-strip' : null
            }`}
          >
            <div className="grid grid-cols-3 gap-2">
              <HtmlLabel
                title="Length"
                optional
                error={errors.slotTypes?.[slotIndex]?.length?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the description"
                  {...register(`slotTypes.${slotIndex}.length`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>
              <HtmlLabel
                title="Width"
                optional
                error={errors.slotTypes?.[slotIndex]?.width?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the description"
                  {...register(`slotTypes.${slotIndex}.width`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>
              <HtmlLabel
                title="Height"
                optional
                error={errors.slotTypes?.[slotIndex]?.height?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the description"
                  {...register(`slotTypes.${slotIndex}.height`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <HtmlLabel
                title="Price/hr"
                optional
                error={errors.slotTypes?.[slotIndex]?.pricePerHour?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Price per hour"
                  {...register(`slotTypes.${slotIndex}.pricePerHour`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>
              <HtmlLabel
                title="Number of slots"
                optional
                error={errors.slotTypes?.[slotIndex]?.count?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the number of slots"
                  {...register(`slotTypes.${slotIndex}.count`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>

              <HtmlLabel
                title="Projection type"
                error={errors.slotTypes?.[slotIndex]?.type?.toString()}
              >
                <HtmlSelect
                  placeholder="projection type"
                  {...register(`slotTypes.${slotIndex}.type`)}
                >
                  {Object.values(SlotType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </HtmlSelect>
              </HtmlLabel>
            </div>
          </div>
        </Accordion>
      ))}
      <div>
        <Button
          className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
          size="none"
          variant="text"
          onClick={() =>
            append({
              length: 10,
              width: 10,
              height: 10,
              pricePerHour: 20,
              count: 5,
              type: SlotType.Car,
            })
          }
        >
          <IconPlus className="w-4 h-4" /> Add slots
        </Button>
      </div>
    </div>
  )
}

export const ShowFormImages = () => {
  const { images } = useWatch<FormTypeCreateGarage>()
  if (!images?.length) {
    return null
  }

  return <AutoImageChanger images={images} />
}

export const MapMarker = () => {
  const { location } = useWatch<FormTypeCreateGarage>()
  const { setValue } = useFormContext<FormTypeCreateGarage>()

  return (
    <Marker
      pitchAlignment="auto"
      longitude={location?.lng || 0}
      latitude={location?.lat || 0}
      draggable
      onDragEnd={({ lngLat }) => {
        const { lat, lng } = lngLat
        setValue('location.lat', lat || 0)
        setValue('location.lng', lng || 0)
      }}
    >
      <ParkingIcon />
    </Marker>
  )
}
