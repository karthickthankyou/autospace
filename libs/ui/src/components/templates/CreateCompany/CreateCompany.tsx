import { HtmlInput } from '../../atoms/HtmlInput'
import { Button } from '../../atoms/Button'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { useCreateCompanyForm } from '@autospace-org/forms/src/createManager'
import { Form } from '../../atoms/Form'
import { useState } from 'react'
import { Dialog } from '../../atoms/Dialog'
import {
  namedOperations,
  useCreateCompanyMutation,
  useCreateCustomerMutation,
} from '@autospace-org/network/src/generated'

export interface ICreateCompanyProps {}

export const CreateCompany = ({}: ICreateCompanyProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateCompanyForm()

  const [createCompany, { loading, data }] = useCreateCompanyMutation()

  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Company</Button>
      <Dialog open={open} setOpen={setOpen} title="Create company">
        <Form
          onSubmit={handleSubmit(async ({ companyName, managerName }) => {
            await createCompany({
              variables: {
                createCompanyInput: {
                  displayName: companyName,
                  managerDisplayName: managerName,
                },
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.myCompany],
            })
          })}
        >
          <HtmlLabel title="Company name" error={errors.companyName?.message}>
            <HtmlInput
              placeholder="Company name"
              {...register('companyName')}
            />
          </HtmlLabel>
          <HtmlLabel title="Manager name" error={errors.managerName?.message}>
            <HtmlInput
              placeholder="Manager name"
              {...register('managerName')}
            />
          </HtmlLabel>
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
