import {
  MyCompanyQuery,
  useMyCompanyQuery,
} from '@autospace-org/network/src/generated'
import { LoaderPanel } from '../../molecules/Loader'
import { QueryResult } from '@autospace-org/network'
import { AlertSection } from '../AlertSection'
import { CreateGarage } from '../../templates/CreateGarage'
import Link from 'next/link'
import { CreateCompany } from '../../templates/CreateCompany'

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
      <ListGarages garages={data.myCompany.garages} />
    </div>
  )
}

export const ListGarages = ({
  garages,
}: {
  garages: MyCompanyQuery['myCompany']['garages']
}) => {
  if (garages.length === 0) {
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
    <div className="grid grid-cols-3">
      {garages.map((garage) => (
        <div key={garage.id}>
          <div>{garage.displayName}</div>
          <div>{garage.description}</div>
        </div>
      ))}
    </div>
  )
}
