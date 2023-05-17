import {
  namedOperations,
  useCreateVerificationMutation,
  useGaragesQuery,
  useRemoveVerificationMutation,
} from '@autospace-org/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { useState } from 'react'
import { useUserStore } from '@autospace-org/store/user'
import { notification$ } from '@autospace-org/util/subjects'
import { Button } from '../../atoms/Button'

export interface IAdminProps {}

export const Admin = ({}: IAdminProps) => {
  return (
    <div>
      <ShowGarages />
    </div>
  )
}

export const ShowGarages = () => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)
  const { loading, data, error } = useGaragesQuery({
    variables: { skip, take },
  })

  return (
    <ShowData
      error={error?.message}
      title="Garages"
      loading={loading}
      pagination={{
        resultCount: data?.garages.length || 0,
        totalCount: data?.garagesCount.count || 0,
        setSkip,
        setTake,
        skip,
        take,
      }}
    >
      {data?.garages.map((garage) => (
        <div>
          <div>{garage.id}</div>
          {!garage?.verification?.verified ? (
            <CreateVerificationButton garageId={garage.id} />
          ) : (
            <RemoveVerificationButton garageId={garage.id} />
          )}
        </div>
      ))}
    </ShowData>
  )
}

export const CreateVerificationButton = ({
  garageId,
}: {
  garageId: number
}) => {
  const [createVerification, { loading }] = useCreateVerificationMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.Garages],
  })
  const uid = useUserStore((state) => state.uid)
  return (
    <Button
      variant="outlined"
      loading={loading}
      onClick={async () => {
        if (!uid) {
          notification$.next({ message: 'You are not logged in.' })
          return
        }
        await createVerification({
          variables: {
            createVerificationInput: { adminId: uid, garageId, verified: true },
          },
        })
      }}
    >
      Verify
    </Button>
  )
}

export const RemoveVerificationButton = ({
  garageId,
}: {
  garageId: number
}) => {
  const [removeVerification, { loading: removeVerificationLoading }] =
    useRemoveVerificationMutation({
      awaitRefetchQueries: true,
      refetchQueries: [namedOperations.Query.Garages],
    })
  const uid = useUserStore((state) => state.uid)
  return (
    <Button
      variant="text"
      loading={removeVerificationLoading}
      onClick={async () => {
        if (!uid) {
          notification$.next({ message: 'You are not logged in.' })
          return
        }
        await removeVerification({ variables: { where: { garageId } } })
      }}
    >
      Unlist
    </Button>
  )
}
