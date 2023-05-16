import {
  FieldNamesMarkedBoolean,
  UseFormSetError,
  UseFormClearErrors,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { FormTypeSearchGarage } from '../searchGarages'
import { SearchGaragesQueryVariables } from '@autospace-org/network/src/generated'
import { useDebouncedValue } from '@autospace-org/hooks/src/async'

type FormData = Partial<
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
>

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<SearchGaragesQueryVariables | null>(null)

  const {
    setError,
    clearErrors,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarage>()
  const formData = useWatch<FormTypeSearchGarage>()

  const debouncedForm = useDebouncedValue(formData, 2000)

  useEffect(() => {
    // Date filter
    const dateFilter = createDateFilter({
      endTime: debouncedForm.endTime,
      startTime: debouncedForm.startTime,
      setError,
      clearErrors,
    })

    // Location filter
    const locationFilter = createLocationFilter({
      locationFilterData: formData.locationFilter,
      setError,
      clearErrors,
    })

    if (!dateFilter || !locationFilter) {
      return
    }
    const slotsFilter = createSlotsFilter(dirtyFields, formData)
    const garagesFilter = createGaragesFilter(dirtyFields, formData)

    const filter = {
      dateFilter,
      locationFilter,
      ...(Object.keys(slotsFilter).length && { slotsFilter }),
      ...(Object.keys(garagesFilter).length && { garagesFilter }),
    }

    setVariables(filter)
  }, [debouncedForm])

  // Convert form data to query variables
  return { variables }
}

export const createDateFilter = ({
  startTime,
  endTime,
  setError,
  clearErrors,
}: {
  startTime?: string
  endTime?: string
  setError: UseFormSetError<FormData>
  clearErrors: UseFormClearErrors<FormData>
}) => {
  if (!startTime || !endTime) {
    setError('startTime', { message: 'Start and end date are required' })
    return null
  } else {
    clearErrors('startTime')
  }
  if (startTime && endTime && startTime > endTime) {
    setError('endTime', { message: 'End date must be after start date' })
    return null
  } else {
    clearErrors('endTime')
  }

  return { start: startTime, end: endTime }
}

export const createLocationFilter = ({
  locationFilterData,
  setError,
  clearErrors,
}: {
  locationFilterData: FormData['locationFilter']
  setError: UseFormSetError<FormData>
  clearErrors: UseFormClearErrors<FormData>
}) => {
  const { nw_lat, nw_lng, se_lat, se_lng } = locationFilterData || {}

  if (!nw_lat || !nw_lng || !se_lat || !se_lng) {
    setError('locationFilter', { message: 'Location is required.' })
    return null
  } else {
    clearErrors('locationFilter')
  }

  return { nw_lat, nw_lng, se_lat, se_lng }
}

export const createSlotsFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const length = dirtyFields.length && intFilter(formData.length)
  const width = dirtyFields.width && intFilter(formData.width)
  const height = dirtyFields.height && intFilter(formData.height)
  const pricePerHour =
    dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
  const type = dirtyFields.type && { in: formData.type || [] }

  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  }
}

export const createGaragesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const skip = (dirtyFields.skip && formData.skip) || 0
  const take = (dirtyFields.take && formData.take) || 10

  return {
    ...(skip && { skip }),
    ...(take && { take }),
  }
}

export const intFilter = (data?: [number, number]) => {
  if (!data) return {}
  const filterObj: { gte?: number; lte?: number } = {}
  if (data[0] !== 0) filterObj['gte'] = data[0]
  if (data[1] !== 0) filterObj['lte'] = data[1]
  return filterObj
}
