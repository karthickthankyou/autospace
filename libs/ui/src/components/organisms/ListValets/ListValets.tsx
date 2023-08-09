import { useTakeSkip } from '@autospace-org/hooks/src/async'
import { useCompanyValetsQuery } from '@autospace-org/network/src/generated'
import { ShowData } from '../ShowData'
import { ValetCard } from '../ValetCard'

export interface IListValetsProps {}

export const ListValets = () => {
  const { take, skip, setSkip, setTake } = useTakeSkip()
  const { data, loading } = useCompanyValetsQuery({ variables: { skip, take } })
  return (
    <ShowData
      loading={loading}
      pagination={{
        resultCount: data?.companyValets.length,
        totalCount: undefined,
        take,
        skip,
        setSkip,
        setTake,
      }}
      title={undefined}
    >
      {data?.companyValets.map((valet) => (
        <ValetCard key={valet.uid} valet={valet} />
      ))}
    </ShowData>
  )
}
