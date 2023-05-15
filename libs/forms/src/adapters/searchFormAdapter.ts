import { FieldNamesMarkedBoolean, UseFormSetError } from 'react-hook-form'
import { FormTypeSearchGarage } from '../searchGarages'
import { SearchGaragesQueryVariables } from '@autospace-org/network/src/generated'

export const searchFormAdapter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: Partial<
    Pick<
      FormTypeSearchGarage,
      | 'endTime'
      | 'startTime'
      | 'height'
      | 'length'
      | 'width'
      | 'pricePerHour'
      | 'type'
      | 'locationFilter'
      | 'skip'
      | 'take'
    >
  >,
  setError: UseFormSetError<FormTypeSearchGarage>,
): SearchGaragesQueryVariables | null => {
  /**
   * Date filter
   */
  const start = formData.startTime
  const end = formData.endTime

  const dateFilter: SearchGaragesQueryVariables['dateFilter'] = {
    start: '',
    end: '',
  }

  if (!start || !end) {
    setError('startTime', { message: 'Start and end date are required' })
    return null
  }
  if (start && end && start > end)
    setError('endTime', {
      message: 'End date must be after start date',
    })

  dateFilter.start = start
  dateFilter.end = end

  /**
   * Location filter
   */

  const nw_lat = formData.locationFilter?.nw_lat
  const nw_lng = formData.locationFilter?.nw_lng
  const se_lat = formData.locationFilter?.se_lat
  const se_lng = formData.locationFilter?.se_lng

  const locationFilter: SearchGaragesQueryVariables['locationFilter'] = {
    nw_lat: 0,
    nw_lng: 0,
    se_lat: 0,
    se_lng: 0,
  }

  if (!nw_lat || !nw_lng || !se_lat || !se_lng) {
    setError('locationFilter', { message: 'Location is required' })
    return null
  }

  locationFilter.nw_lat = nw_lat
  locationFilter.nw_lng = nw_lng
  locationFilter.se_lat = se_lat
  locationFilter.se_lng = se_lng

  /**
   * Slots filter
   */

  const length = dirtyFields.length && intFilter(formData.length)
  const width = dirtyFields.width && intFilter(formData.width)
  const height = dirtyFields.height && intFilter(formData.height)
  const pricePerHour =
    dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
  const type = dirtyFields.type && { in: formData.type || [] }

  const slotsFilter: SearchGaragesQueryVariables['slotsFilter'] = {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  }

  /**
   * Garage filter
   */

  const skip = (dirtyFields.skip && formData.skip) || 0
  const take = (dirtyFields.take && formData.take) || 10

  const garagesFilter: SearchGaragesQueryVariables['garageFilter'] = {
    ...(skip && { skip }),
    ...(take && { take }),
  }

  const filter: SearchGaragesQueryVariables = {
    dateFilter,
    locationFilter,
    ...(Object.keys(slotsFilter).length && { slotsFilter }),
    ...(Object.keys(garagesFilter).length && { garagesFilter }),
  }

  return filter
}

export const intFilter = (data?: [number, number]) => {
  if (!data) return {}
  const filterObj: { gte?: number; lte?: number } = {}
  if (data[0] !== 0) filterObj['gte'] = data[0]
  if (data[1] !== 0) filterObj['lte'] = data[1]
  return filterObj
}
