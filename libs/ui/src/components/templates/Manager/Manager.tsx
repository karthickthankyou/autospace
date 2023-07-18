import { CompanyInfo } from '../../organisms/CompanyInfo'
import { AlertSection } from '../../organisms/AlertSection'
import { LinkButton } from '../../atoms/LinkButton'
import { useMyCompanyLazyQuery } from '@autospace-org/network/src/generated'
import { useEffect } from 'react'
import { useAppSelector } from '@autospace-org/store'
import { selectUid, selectUser } from '@autospace-org/store/user'

import { LoaderPanel } from '../../molecules/Loader'

export interface IManagerProps {}

export const Manager = ({}: IManagerProps) => {
  const { uid, loaded } = useAppSelector(selectUser)

  const [getCompany, data] = useMyCompanyLazyQuery()

  useEffect(() => {
    if (uid) {
      getCompany()
    }
  }, [uid])

  if (!loaded) {
    return <LoaderPanel />
  }

  if (!uid)
    return (
      <AlertSection>
        <div>You are not logged in.</div>
        <LinkButton href="/login">Login</LinkButton>
      </AlertSection>
    )

  return <CompanyInfo company={data} />
}
