import {
  namedOperations,
  useAdminsQuery,
  useCreateAdminMutation,
  useRemoveAdminMutation,
} from '@autospace-org/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { SetStateAction, useState } from 'react'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Form } from '../../atoms/Form'
import { useFormRegister } from '@autospace-org/forms'
import { IconMoodSmileBeam, IconTrash } from '@tabler/icons-react'
import { useUserStore } from '@autospace-org/store/user'

export interface IManageAdminsProps {}

export const ManageAdmins = ({}: IManageAdminsProps) => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)
  const { data, loading } = useAdminsQuery()
  const uid = useUserStore((state) => state.uid)
  return (
    <div>
      <div className="flex justify-end">
        <CreateAdmin />
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.admins.length,
          totalCount: data?.adminsCount.count,
          setSkip,
          setTake,
        }}
        title={'Manage admins'}
      >
        {data?.admins.map((admin) => (
          <div key={admin.uid}>
            {admin.uid}
            <div>{admin.uid === uid ? 'You' : null}</div>
            <RemoveAdmin uid={admin.uid} />
          </div>
        ))}
      </ShowData>
    </div>
  )
}

export const RemoveAdmin = ({ uid }: { uid: string }) => {
  const [removeAdmin, { loading }] = useRemoveAdminMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.admins],
  })

  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant="text"
        size="none"
        loading={loading}
        onClick={() => setOpen(true)}
      >
        <IconTrash className="text-red" />
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Delete'}>
        <div>
          Are you sure you want to delete this innocent soul from the admin
          realm?
        </div>
        <div className="my-2 text-xs text-gray">{uid}</div>
        <div className="grid w-full grid-cols-2 gap-2 mt-4">
          <Button variant="outlined" onClick={() => setOpen(false)}>
            No.
          </Button>
          <Button
            loading={loading}
            onClick={async () => {
              await removeAdmin({ variables: { where: { uid } } })
            }}
          >
            Yes.
          </Button>
        </div>
      </Dialog>
    </>
  )
}

export const CreateAdmin = () => {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useFormRegister()
  const [createAdmin, { data, loading }] = useCreateAdminMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.admins],
  })

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create admin</Button>
      <Dialog open={open} setOpen={setOpen} title={'Create admin'}>
        <Form
          onSubmit={handleSubmit(async ({ email, password, displayName }) => {
            await createAdmin({
              variables: { createAdminInput: { displayName, password, email } },
            })
            setOpen(false)
          })}
        >
          <HtmlLabel title="Email">
            <HtmlInput placeholder="email" {...register('email')} />
          </HtmlLabel>
          <HtmlLabel title="Password">
            <HtmlInput
              placeholder="email"
              type="password"
              {...register('password')}
            />
          </HtmlLabel>
          <HtmlLabel optional title="Display name">
            <HtmlInput placeholder="name" {...register('displayName')} />
          </HtmlLabel>
          <Button loading={loading} type="submit">
            Create
          </Button>
        </Form>
      </Dialog>
    </>
  )
}
