import {
  CreateManySlotsDocument,
  SlotType,
} from '@autospace-org/network/src/generated'
import { HtmlLabel } from '@autospace-org/ui/src/components/atoms/HtmlLabel'
import { HtmlInput } from '@autospace-org/ui/src/components/atoms/HtmlInput'
import { HtmlSelect } from '@autospace-org/ui/src/components/atoms/HtmlSelect'
import { Form } from '@autospace-org/ui/src/components/atoms/Form'
import { Button } from '@autospace-org/ui/src/components/atoms/Button'
import { useMutation } from '@autospace-org/network'
import { useFormCreateManySlots } from '@autospace-org/forms/src/createManySlots'

const CreateSlotsPage = () => {
  const [createManySlots, { data, loading }] = useMutation(
    CreateManySlotsDocument,
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateManySlots()

  return (
    <div>
      <Form
        onSubmit={handleSubmit((data) => {
          const { pricePerHour, count, ...rest } = data
          const slots = Array.from({ length: count }, (_, i) => ({
            pricePerHour,
            ...rest,
            displayName: `${i}`,
          }))

          createManySlots({
            variables: {
              garageId: 12,
              slots,
            },
          })
        })}
      >
        <HtmlLabel error={errors.pricePerHour?.message}>
          <HtmlInput
            type="number"
            placeholder="Price per hour"
            {...register('pricePerHour', { valueAsNumber: true })}
          />
        </HtmlLabel>
        <HtmlLabel error={errors.count?.message}>
          <HtmlInput
            type="number"
            placeholder="Number of slots"
            {...register('count', { valueAsNumber: true })}
          />
        </HtmlLabel>
        <HtmlLabel error={errors.height?.message}>
          <HtmlInput
            type="number"
            placeholder="height in meters"
            {...register('height', { valueAsNumber: true })}
          />
        </HtmlLabel>
        <HtmlLabel error={errors.width?.message}>
          <HtmlInput
            type="number"
            placeholder="width in meters"
            {...register('width', { valueAsNumber: true })}
          />
        </HtmlLabel>
        <HtmlLabel error={errors.length?.message}>
          <HtmlInput
            type="number"
            placeholder="length in meters"
            {...register('length', { valueAsNumber: true })}
          />
        </HtmlLabel>
        <HtmlLabel error={errors.count?.message}>
          <HtmlInput
            type="number"
            placeholder="Starting slot number."
            {...register('count', { valueAsNumber: true })}
          />
        </HtmlLabel>
        <HtmlLabel error={errors.type?.message?.toString()}>
          <HtmlSelect placeholder="type" {...register('type')}>
            {Object.values(SlotType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </HtmlSelect>
        </HtmlLabel>

        <Button loading={loading} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default CreateSlotsPage
