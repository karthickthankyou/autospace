import { ShowValetDropTrips } from '../../organisms/ShowValetDropTrips/ShowValetDropTrips'
import { ShowValetPickupTrips } from '../../organisms/ShowValetPickupTrips/ShowValetPickupTrips'

export const MyTrips = () => {
  return (
    <div className="space-y-12">
      <ShowValetPickupTrips />
      <ShowValetDropTrips />
    </div>
  )
}
