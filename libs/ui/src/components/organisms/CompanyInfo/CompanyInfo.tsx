import {
  MyCompanyQuery,
  useGaragesQuery,
  useMyCompanyQuery,
} from '@autospace-org/network/src/generated'
import Link from 'next/link'
import { useState } from 'react'
import { LoaderPanel } from '../../molecules/Loader'
import { CreateCompany } from '../../templates/CreateCompany'
import { AlertSection } from '../AlertSection'
import { GarageCard } from '../GarageCard'
import { ShowData } from '../ShowData'

export const CompanyInfo = () => {
  const { data, loading } = useMyCompanyQuery()

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
    <div className="space-y-12">
      <div>
        <div className="text-lg font-semibold">
          {data?.myCompany.displayName}
        </div>
        <div className="max-w-lg mt-2 text-sm text-gray">
          {data?.myCompany.description}
        </div>
      </div>
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
        Hey, You dont have any garages in your company.
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
