import {
  BookingStatus,
  CreateSlotInput,
  GaragesQuery,
  SlotType,
  namedOperations,
  useBookingsForGarageQuery,
  useCreateBookingTimelineMutation,
  useCreateManySlotsMutation,
} from '@autospace-org/network/src/generated'
import { IconTypes } from '../../molecules/SelectParkingSlotType/SelectParkingSlotType'
import { Dialog } from '../../atoms/Dialog'
import { useState } from 'react'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { useFormCreateManySlots } from '@autospace-org/forms/src/createManySlots'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlSelect } from '../../atoms/HtmlSelect'
import { Button } from '../../atoms/Button'
import { ShowData } from '../ShowData'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'
import { Reveal } from '../../molecules/Reveal'
import { PlainButton } from '../../atoms/PlainButton'
import Image from 'next/image'
import Link from 'next/link'

export interface IGarageCardProps {
  garage: GaragesQuery['garages'][number]
}

export const GarageCard = ({ garage }: IGarageCardProps) => {
  return (
    <div className="overflow-hidden ">
      <div className="shadow-lg ">
        <Image
          src={garage?.images?.[0] || ''}
          alt=""
          width={200}
          height={200}
          className="object-cover w-full aspect-square"
        />
      </div>
      {/* <AutoImageChanger images={garage.images || []} durationPerImage={2000} /> */}

      <div className="flex justify-between my-2">
        <h3 className="font-semibold ">{garage.displayName}</h3>
        <Link
          className="text-sm underline underline-offset-4"
          href={{ pathname: 'bookings', query: { garageId: garage.id } }}
        >
          Bookings
        </Link>
      </div>
      <p className="text-gray-500 ">{garage.description}</p>
      <p className="text-sm text-gray-400">Address: {garage.address.address}</p>
      <div className="flex gap-2 mt-2">
        <>
          {garage.slotCounts.map((slotType) => (
            <div
              key={slotType.type}
              className="flex items-center justify-center w-16 h-10 gap-1 border-2 border-primary"
            >
              <div>{IconTypes[slotType.type]}</div>
              <div className="text-sm">{slotType.count}</div>
            </div>
          ))}
          <CreateManySlotsDialog garageId={garage.id} />
        </>
      </div>
    </div>
  )
}

export const CreateManySlotsDialog = ({ garageId }: { garageId: number }) => {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateManySlots()

  const [createManySlots, { loading, data }] = useCreateManySlotsMutation()
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-16 h-10 border-2 group border-primary"
      >
        <div className="transition-transform duration-300 group-hover:scale-150">
          +
        </div>
      </button>
      <Dialog open={open} setOpen={setOpen} title={'Create slots'}>
        <Form
          onSubmit={handleSubmit(async ({ count, ...data }) => {
            const newSlots: CreateSlotInput[] = []

            for (let i = 0; i < count; i++) {
              newSlots.push({ ...data, garageId })
            }
            await createManySlots({
              variables: { slots: newSlots },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.Garages],
            })
            setOpen(false)
          })}
        >
          <div className="grid grid-cols-2 gap-2">
            <HtmlLabel title="Length" error={errors.length?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the length in ft"
                {...register('length', {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Width" error={errors.width?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the width in ft"
                {...register(`width`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Height" error={errors.height?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the height in ft"
                {...register(`height`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>

            <HtmlLabel title="Price/hr" error={errors.pricePerHour?.message}>
              <HtmlInput
                type="number"
                placeholder="Price per hour"
                {...register(`pricePerHour`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Number of slots" error={errors.count?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the number of slots"
                {...register(`count`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>

            <HtmlLabel title="Slot type" error={errors.type?.toString()}>
              <HtmlSelect placeholder="Slot type" {...register(`type`)}>
                {Object.values(SlotType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </HtmlLabel>
          </div>
          <Button loading={loading} type="submit">
            Create slots
          </Button>
        </Form>
      </Dialog>
    </>
  )
}
