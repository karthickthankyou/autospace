import { useState } from 'react'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { useFormCreateGarage } from '@autospace-org/forms/src/createGarage'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Form } from '../../atoms/Form'
export interface ICreateGarageProps {}

export const CreateGarage = ({}: ICreateGarageProps) => {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useFormCreateGarage()
  return (
    <div>
      <Form
        onSubmit={handleSubmit((data) => {
          console.log('DAata', data)
        })}
      >
        <HtmlLabel title="Display Name">
          <HtmlInput {...register('displayName')} />
        </HtmlLabel>
        <HtmlLabel title="Description">
          <HtmlInput {...register('description')} />
        </HtmlLabel>
        <Button type="submit">Create garage</Button>
      </Form>
    </div>
  )
}
