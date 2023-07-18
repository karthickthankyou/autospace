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
import { GarageAdminCard } from '../../organisms/GarageAdminCard'
import { PlainButton } from '../../atoms/PlainButton'

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
        <div key={garage.id}>
          <GarageAdminCard garage={garage} />

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
    <PlainButton
      loading={loading}
      className="font-semibold underline underline-offset-4"
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
    </PlainButton>
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
    <PlainButton
      className="font-semibold"
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
    </PlainButton>
  )
}
