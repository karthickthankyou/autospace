export interface IManageBookingsProps {
  garageId: number
}

export const ManageBookings = ({ garageId }: IManageBookingsProps) => {
  return <div>Hello, This is ManageBookings component! {garageId}</div>
}
