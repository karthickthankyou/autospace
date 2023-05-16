import { Map } from '../../organisms/Map'
import { useEffect, useState } from 'react'
import { useTransition, animated, config } from 'react-spring'

import {
  LocationInfo,
  useSearchLocation,
} from '@autospace-org/hooks/src/location'
import { Button } from '../../atoms/Button'
import {
  IconCurrentLocation,
  IconExclamationCircle,
  IconInfoCircle,
  IconRefresh,
} from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'

import { FormTypeSearchGarage } from '@autospace-org/forms/src/searchGarages'
import { useConvertSearchFormToVariables } from '@autospace-org/forms/src/adapters/searchFormAdapter'
import { FilterSidebar } from '../../organisms/FilterSidebar'
import { Panel } from '../../organisms/Map/Panel'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import {
  SearchGaragesQuery,
  useSearchGaragesLazyQuery,
} from '@autospace-org/network/src/generated'
import { Marker } from '../../organisms/Map/MapMarker'
import { Popup } from '../../organisms/Map/Popup'
import { BookSlotPopup } from '../../organisms/Map/BookSlotPopup'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { ViewStateChangeEvent, useMap } from 'react-map-gl'
import { useKeypress } from '@autospace-org/util'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import React from 'react'
import { Autocomplete } from '../../atoms/Autocomplete'
import { majorCitiesLocationInfo } from '../../organisms/SearchPlaceBox/SearchPlaceBox'

export interface ISearchPageTemplateProps {
  initialProps: {
    type: string[]
    endTime: string
    startTime: string
    placeName: string
    lat: number
    lng: number
  }
}

export const CurrentLocationButton = () => {
  const { current: map } = useMap()

  return (
    <Button
      variant="text"
      className="hover:bg-gray-200"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            map?.flyTo({ center: { lat: latitude, lng: longitude } })
          },
          (error) => {
            console.error(error)
          },
          { enableHighAccuracy: true, timeout: 20000 },
          //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
      }}
    >
      <IconCurrentLocation className="stroke-1.5" />
    </Button>
  )
}

export const SearchPageTemplate = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeSearchGarage>()

  function handleMapChange(event: ViewStateChangeEvent) {
    const bounds = event.target.getBounds()

    const locationFilter = {
      nw_lat: bounds?.getNorthWest().lat || 0,
      nw_lng: bounds?.getNorthWest().lng || 0,
      se_lat: bounds?.getSouthEast().lat || 0,
      se_lng: bounds?.getSouthEast().lng || 0,
    }

    setValue('locationFilter', locationFilter)
  }

  return (
    <Map onZoomEnd={handleMapChange} onDragEnd={handleMapChange}>
      {/* Query and display garages */}
      <ShowMarkers />
      <Panel position="left-top" className="bg-white/50">
        <div className="flex flex-col items-stretch gap-2 py-2">
          {/* Self managing search box. Moves map to the selected location. */}
          <SearchBox />

          <HtmlLabel title="Start time" error={errors.startTime?.message}>
            <HtmlInput
              type="datetime-local"
              className="w-full p-2 text-lg font-light"
              min={new Date().toISOString().slice(0, 16)}
              {...register('startTime')}
            />
          </HtmlLabel>
          <HtmlLabel title="End time" error={errors.endTime?.message}>
            <HtmlInput
              min={new Date().toISOString().slice(0, 16)}
              type="datetime-local"
              className="w-full p-2 text-lg font-light"
              {...register('endTime')}
            />
          </HtmlLabel>
        </div>
      </Panel>
      <Panel position="right-top">
        <div className="flex">
          <CurrentLocationButton />
          <FilterSidebar />
        </div>
      </Panel>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      {Object.entries(errors).length ? (
        <Panel position="center-bottom">
          {Object.entries(errors).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-1 p-2 border border-red"
            >
              <IconExclamationCircle />
              <div className="font-medium">
                {key}: {value.message}
              </div>
            </div>
          ))}
        </Panel>
      ) : null}
    </Map>
  )
}

export const MapPositionManager = ({
  onMoveEnd,
}: {
  onMoveEnd: ({
    lat,
    lng,
    locationFilter,
  }: {
    lat: number
    lng: number
    locationFilter: FormTypeSearchGarage['locationFilter']
  }) => void
}) => {
  const { current: map } = useMap()

  useEffect(() => {
    const handleMoveEnd = () => {
      if (!map) {
        return
      }
      const center = map.getCenter()
      if (!center) {
        return
      }
      const bounds = map.getBounds()

      const locationFilter = {
        nw_lat: bounds?.getNorthWest().lat || 0,
        nw_lng: bounds?.getNorthWest().lng || 0,
        se_lat: bounds?.getSouthEast().lat || 0,
        se_lng: bounds?.getSouthEast().lng || 0,
      }

      onMoveEnd({ lat: center?.lat, lng: center?.lng, locationFilter })
    }

    map?.on('moveend', handleMoveEnd)

    // cleanup
    return () => {
      map?.off('moveend', handleMoveEnd)
    }
  }, [map])

  return null
}

export const MarkerWithPopup = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showPopup, setShowPopup] = useState(false)
  useKeypress(['Escape'], () => setShowPopup(false))

  return (
    <>
      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          console.log(' show popup ', showPopup)
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon />
      </Marker>
      <Popup
        show={showPopup}
        setShow={setShowPopup}
        latitude={marker.address.lat}
        longitude={marker.address.lng}
      >
        <BookSlotPopup garage={marker} />
      </Popup>
    </>
  )
}

export const ShowMarkers = () => {
  const [garages, setGarages] = useState<SearchGaragesQuery['searchGarages']>(
    [],
  )
  const [searchGarages, { loading, data }] = useSearchGaragesLazyQuery()

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    console.log('variables ', variables)
    if (variables) {
      searchGarages({ variables })
    }
  }, [variables])
  useEffect(() => {
    if (data?.searchGarages) {
      setGarages(data?.searchGarages || [])
    }
  }, [data?.searchGarages])

  const markersTransitions = useTransition(garages || [], {
    keys: (garage) => garage.id,
    from: { opacity: 0, transform: 'translateY(-6px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0 },
    trail: 50,
    config: config.molasses,
  })

  if (markersTransitions.length === 0) {
    return (
      <Panel position="center-center" className="bg-white/50">
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <div>
      {loading ? (
        <Panel position="center-bottom">
          <IconRefresh className="animate-spin-reverse" />
        </Panel>
      ) : null}
      {markersTransitions((style, garage) => (
        <animated.div key={garage.id} style={style}>
          <MarkerWithPopup marker={garage} />
        </animated.div>
      ))}
    </div>
  )
}

export const SearchBox = () => {
  const { current: map } = useMap()
  const { loading, setLoading, searchText, setSearchText, locationInfo } =
    useSearchLocation()

  return (
    <Autocomplete<LocationInfo, false, false, false>
      options={locationInfo.length ? locationInfo : majorCitiesLocationInfo}
      isOptionEqualToValue={(option, value) =>
        option.placeName === value.placeName
      }
      noOptionsText={searchText ? 'No options.' : 'Type something...'}
      getOptionLabel={(x) => x.placeName}
      onInputChange={(_, v) => {
        setLoading(true)
        setSearchText(v)
      }}
      loading={loading}
      onChange={(_, v) => {
        if (v) {
          const { latLng, placeName } = v
          map?.flyTo({ center: { lat: latLng[0], lng: latLng[1] } })
        }
      }}
    />
  )
}
