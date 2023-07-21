import { CompanyInfo } from '../../organisms/CompanyInfo'
import { WhileLoggedIn } from '../WhileLoggedIn'

export interface IManagerProps {}

export const Manager = ({}: IManagerProps) => {
  return (
    <WhileLoggedIn>
      <CompanyInfo />
    </WhileLoggedIn>
  )
}
