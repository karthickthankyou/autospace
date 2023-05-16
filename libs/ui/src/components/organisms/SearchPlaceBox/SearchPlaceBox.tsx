import { useMapStore } from '@autospace-org/store/map'
import {
  LocationInfo,
  useSearchLocation,
} from '@autospace-org/hooks/src/location'

import { Autocomplete } from '../../atoms/Autocomplete'
import { useEffect } from 'react'

export interface ISearchPlaceBoxProps {
  setLocationInfo: (locationInfo: LocationInfo) => void
  value?: string
}

export const majorCitiesLocationInfo: LocationInfo[] = [
  {
    placeName: 'Chennai, India',
    latLng: [13.0827, 80.2707],
  },
  {
    placeName: 'New York, USA',
    latLng: [40.7128, -74.006],
  },
  {
    placeName: 'London, UK',
    latLng: [51.5074, -0.1278],
  },
  {
    placeName: 'Tokyo, Japan',
    latLng: [35.6895, 139.6917],
  },
  {
    placeName: 'Paris, France',
    latLng: [48.8566, 2.3522],
  },
  {
    placeName: 'Berlin, Germany',
    latLng: [52.52, 13.405],
  },
  {
    placeName: 'Sydney, Australia',
    latLng: [-33.8688, 151.2093],
  },
  {
    placeName: 'Rio de Janeiro, Brazil',
    latLng: [-22.9068, -43.1729],
  },
  {
    placeName: 'Cape Town, South Africa',
    latLng: [-33.9249, 18.4241],
  },
  {
    placeName: 'Moscow, Russia',
    latLng: [55.7558, 37.6176],
  },
  {
    placeName: 'Beijing, China',
    latLng: [39.9042, 116.4074],
  },
]

export const SearchPlaceBox = ({
  setLocationInfo,
  value,
}: ISearchPlaceBoxProps) => {
  //   console.log('Recent searches', recentSearches)
  const { loading, setLoading, searchText, locationInfo, setSearchText } =
    useSearchLocation()

  useEffect(() => {
    if (value) setSearchText(value)
  }, [value])

  const { prevSearches, addPrevSearches } = useMapStore((state) => ({
    prevSearches: state.prevSearches,
    addPrevSearches: state.addPrevSearches,
  }))

  return (
    <Autocomplete<LocationInfo, false, false, false>
      options={
        locationInfo.length
          ? locationInfo
          : prevSearches.length
          ? prevSearches
          : majorCitiesLocationInfo
      }
      noOptionsText={searchText ? 'No options.' : 'Type something...'}
      getOptionLabel={(x) => x.placeName}
      onInputChange={(_, v) => {
        setLoading(true)
        setSearchText(v)
      }}
      loading={loading}
      isOptionEqualToValue={(option, value) => {
        return option.placeName === value.placeName
      }}
      onChange={(_, v) => {
        if (v) {
          const { latLng, placeName } = v
          addPrevSearches({ latLng, placeName })
          setLocationInfo({ latLng: latLng, placeName: placeName })
        }
      }}
    />
  )
}
