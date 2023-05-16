import { useState } from 'react'
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { Map } from '../../organisms/Map'

import {
  FormProviderCreateGarage,
  FormTypeCreateGarage,
} from '@autospace-org/forms/src/createGarage'
import { Marker } from '../../organisms/Map/MapMarker'

import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Form } from '../../atoms/Form'
import { useUserStore } from '@autospace-org/store/user'
import { IconPlus } from '@tabler/icons-react'
import {
  CenterOfMap,
  DefaultZoomControls,
} from '../../organisms/Map/ZoomControls/ZoomControls'
import { useMap } from 'react-map-gl'
import { SearchPlaceBox } from '../../organisms/SearchPlaceBox'
import { Panel } from '../../organisms/Map/Panel'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { Accordion } from '../../molecules/Accordion'
import { HtmlSelect } from '../../atoms/HtmlSelect'
import {
  SlotType,
  useCreateGarageMutation,
} from '@autospace-org/network/src/generated'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { notification$ } from '@autospace-org/util/subjects'
export interface ICreateGarageProps {}

export const CreateGarage = () => {
  return (
    <FormProviderCreateGarage>
      <CreateGarageContent />
    </FormProviderCreateGarage>
  )
}

export const CreateGarageContent = ({}: ICreateGarageProps) => {
  const [open, setOpen] = useState(false)
  const uid = useUserStore((state) => state.uid)

  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors },
  } = useFormContext<FormTypeCreateGarage>()

  const daata = useWatch<FormTypeCreateGarage>()

  const [createGarage, { loading }] = useCreateGarageMutation()

  return (
    <div className="grid grid-cols-2 gap-2">
      <Dialog open={open} setOpen={setOpen} title={'Success.'}>
        Garage created successfully.
      </Dialog>
      <Form
        onSubmit={handleSubmit(
          async ({ description, displayName, location, slotTypes }) => {
            const { data, errors } = await createGarage({
              variables: {
                createGarageInput: {
                  description,
                  displayName,
                  address: location,
                  slots: slotTypes,
                },
              },
            })

            if (data?.createGarage) {
              setOpen(true)
              reset()
            }
            if (errors?.length) {
              notification$.next({ message: 'Garage creation failed.' })
            }
          },
        )}
      >
        <HtmlLabel title="Display Name">
          <HtmlInput {...register('displayName')} />
        </HtmlLabel>
        <HtmlLabel title="Description">
          <HtmlTextArea cols={5} {...register('description')} />
        </HtmlLabel>
        <HtmlLabel title="Address">
          <HtmlTextArea cols={5} {...register('location.address')} />
        </HtmlLabel>
        <AddSlots />
        <Button loading={loading} type="submit">
          Create garage
        </Button>
      </Form>
      <Map
        initialViewState={{
          longitude: 80.2,
          latitude: 12.9,
          zoom: 8,
        }}
      >
        <MapMarker />

        <Panel position="left-top">
          <SearchBox
            onChange={({ lat, lng }) => {
              setValue('location.lat', lat, { shouldValidate: true })
              setValue('location.lng', lng, { shouldValidate: true })
            }}
          />
          <DefaultZoomControls>
            <CenterOfMap
              onClick={(latLng) => {
                const lat = parseFloat(latLng.lat.toFixed(6))
                const lng = parseFloat(latLng.lng.toFixed(6))

                setValue('location.lat', lat, { shouldValidate: true })
                setValue('location.lng', lng, { shouldValidate: true })
              }}
            />
          </DefaultZoomControls>
        </Panel>
      </Map>
    </div>
  )
}

export const SearchBox = ({
  onChange,
}: {
  onChange: ({ lat, lng }: { lat: number; lng: number }) => void
}) => {
  const { current: map } = useMap()
  return (
    <SearchPlaceBox
      setLocationInfo={(locationInfo) => {
        const lat = locationInfo.latLng[0]
        const lng = locationInfo.latLng[1]
        onChange({ lat, lng })

        map?.flyTo({
          center: { lat, lng },
          essential: true,
        })
      }}
    />
  )
}

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
