import { CompanyInfo } from '../../organisms/CompanyInfo'
import { IsLoggedIn } from '../IsLoggedIn'

export interface IManagerProps {}

export const Manager = ({}: IManagerProps) => {
  return (
    <IsLoggedIn>
      <CompanyInfo />
    </IsLoggedIn>
  )
}
