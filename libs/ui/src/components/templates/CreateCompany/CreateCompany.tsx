import { useCreateCompanyForm } from '@autospace-org/forms/src/createManager'
import {
  namedOperations,
  useCreateCompanyMutation,
} from '@autospace-org/network/src/generated'
import { useAppSelector } from '@autospace-org/store'
import { selectDisplayName } from '@autospace-org/store/user'
import { useEffect, useState } from 'react'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'

export interface ICreateCompanyProps {}

export const CreateCompany = ({}: ICreateCompanyProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useCreateCompanyForm()

  const [createCompany, { loading, data }] = useCreateCompanyMutation()

  const [open, setOpen] = useState(false)

  const displayName = useAppSelector(selectDisplayName)

  useEffect(() => {
    if (displayName) {
      setValue('managerName', displayName)
    }
  }, [displayName])

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Company</Button>
      <Dialog open={open} setOpen={setOpen} title="Create company">
        <Form
          onSubmit={handleSubmit(
            async ({ companyName, managerName, description }) => {
              await createCompany({
                variables: {
                  createCompanyInput: {
                    displayName: companyName,
                    description: description,
                    managerDisplayName: managerName,
                  },
                },
                awaitRefetchQueries: true,
                refetchQueries: [namedOperations.Query.myCompany],
              })
            },
          )}
        >
          <HtmlLabel title="Company name" error={errors.companyName?.message}>
            <HtmlInput
              placeholder="Company name"
              {...register('companyName')}
            />
          </HtmlLabel>
          <HtmlLabel title="Description" error={errors.companyName?.message}>
            <HtmlTextArea
              placeholder="Describe your parking company"
              {...register('description')}
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
