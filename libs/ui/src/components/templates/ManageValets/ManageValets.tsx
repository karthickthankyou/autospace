import { AddValet } from '../../organisms/AddValet'
import { ListValets } from '../../organisms/ListValets'
import { IsLoggedIn } from '../IsLoggedIn'

export interface IManageValetsProps {}

export const ManageValets = ({}: IManageValetsProps) => {
  return (
    <div>
      <IsLoggedIn>
        <div className="flex justify-end">
          <AddValet />
        </div>
        <ListValets />
      </IsLoggedIn>
    </div>
  )
}
