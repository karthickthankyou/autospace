import {
  MyCompanyQuery,
  useGaragesLazyQuery,
  useGaragesQuery,
} from '@autospace-org/network/src/generated'
import { LoaderPanel } from '../../molecules/Loader'
import { QueryResult } from '@autospace-org/network'
import { AlertSection } from '../AlertSection'
import Link from 'next/link'
import { CreateCompany } from '../../templates/CreateCompany'
import { GarageCard } from '../GarageCard'
import { ShowData } from '../ShowData'
import { useState } from 'react'

export interface ICompanyInfoProps {
  company: Pick<QueryResult<MyCompanyQuery>, 'data' | 'loading'>
}

export const CompanyInfo = ({ company }: ICompanyInfoProps) => {
  const { data, loading } = company
  if (loading) {
    return <LoaderPanel />
  }

  if (!data?.myCompany)
    return (
      <AlertSection>
        <div>You don't have a company yet.</div>
        <CreateCompany />
      </AlertSection>
    )

  return (
    <div>
      {data?.myCompany.displayName}
      <ListGarages companyId={data.myCompany.id} />
    </div>
  )
}

export const ListGarages = ({
  companyId,
}: {
  companyId: MyCompanyQuery['myCompany']['id']
}) => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)
  const { data, loading, error } = useGaragesQuery({
    variables: { skip, take, where: { companyId: { equals: companyId } } },
  })

  if (data?.garages.length === 0) {
    return (
      <AlertSection>
        No garages found.
        <Link
          className="px-3 py-2 font-semibold bg-primary"
          href="/createGarage"
        >
          Create garage
        </Link>
      </AlertSection>
    )
  }

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.garages.length,
        totalCount: data?.garagesCount.count,
        setSkip,
        setTake,
      }}
      title={'Garages'}
    >
      {data?.garages.map((garage) => (
        <GarageCard key={garage.id} garage={garage} />
      ))}
    </ShowData>
  )
}
