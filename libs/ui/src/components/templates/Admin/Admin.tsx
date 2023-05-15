import { useGaragesQuery } from '@autospace-org/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { useState } from 'react'

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
  const { loading, data } = useGaragesQuery({ variables: { skip, take } })
  return (
    <ShowData
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
        <div>{garage.id}</div>
      ))}
    </ShowData>
  )
}
