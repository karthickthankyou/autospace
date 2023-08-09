import { useCreateCompanyForm } from '@autospace-org/forms/src/createManager'
import {
  namedOperations,
  useCreateCompanyMutation,
} from '@autospace-org/network/src/generated'
import { useAppSelector } from '@autospace-org/store'
import { selectUid } from '@autospace-org/store/user'
import { useState } from 'react'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'

export const CreateManagerDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateCompanyForm()

  const uid = useAppSelector(selectUid)

  const [open, setOpen] = useState(false)
  const [createCompany, { data, loading }] = useCreateCompanyMutation()

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Create a company
      </Button>
      <Dialog open={open} setOpen={setOpen} title="Create company">
        <Form
          onSubmit={handleSubmit(async ({ companyName, managerName }) => {
            if (!uid) {
              return
            }

            const data = await createCompany({
              variables: {
                createCompanyInput: {
                  displayName: companyName,
                  managerDisplayName: managerName,
                },
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.getManager],
            })
            if (errors) {
              console.error(errors)
            }
            if (data.data?.createCompany?.id) {
              setOpen(false)
            }
          })}
          className="space-y-2"
        >
          <HtmlLabel title="Company name" error={errors.companyName?.message}>
            <HtmlInput
              {...register('companyName')}
              placeholder="Company's name."
            />
          </HtmlLabel>
          <HtmlLabel title="Manager name" error={errors.managerName?.message}>
            <HtmlInput
              {...register('managerName')}
              placeholder="Manager's name. (Hint: Your name.)"
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
