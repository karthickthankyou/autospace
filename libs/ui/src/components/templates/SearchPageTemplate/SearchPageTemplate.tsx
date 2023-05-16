import { Map } from '../../organisms/Map'
import { SearchPlaceBox } from '../../organisms/SearchPlaceBox'
import { useEffect, useState } from 'react'

import {
  LocationInfo,
  useCurrentLocation,
} from '@autospace-org/hooks/src/location'
import { Button } from '../../atoms/Button'
import {
  IconCurrentLocation,
  IconExclamationCircle,
  IconFilter,
  IconInfoCircle,
  IconLetterP,
  IconRefresh,
} from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'

import { PulsingDot } from '../../atoms/Dot/Dot'

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
import { useMap } from 'react-map-gl'
import { PopupContent } from '../../organisms/Map/Popup/Popup'
import { useKeypress } from '@autospace-org/util'
import { useUserStore } from '@autospace-org/store/user'
import { ParkingIcon } from '../../atoms/ParkingIcon'

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
  const { setValue } = useFormContext<FormTypeSearchGarage>()

  const { setCurrentLocation } = useCurrentLocation({
    setLocationInfo: (currentLocation: LocationInfo) =>
      setValue('locationInfo', currentLocation),
  })
  return (
    <Button
      variant="text"
      className="hover:bg-gray-200"
      onClick={() => {
        setCurrentLocation()
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

  return (
    <div>
      <Map>
        <MapPositionManager
          //   lng={80.2707}
          //   lat={13.0827}
          onMoveEnd={({ lat, lng, locationFilter }) => {
            setValue('locationInfo.lat', lat)
            setValue('locationInfo.lng', lng)
            setValue('locationFilter', locationFilter)
          }}
        />
        {/* Query and display garages */}
        <ShowMarkers />
        <Panel position="left-top" className="bg-white/50">
          <div className="flex flex-col items-stretch gap-2 py-2">
            <SearchBox
              onChange={(v) => {
                setValue('locationInfo.lat', v.lat)
                setValue('locationInfo.lng', v.lng)
              }}
            />

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
              <div className="flex items-center gap-1 p-2 border border-red">
                <IconExclamationCircle />
                <div className="font-medium">
                  {key}: {value.message}
                </div>
              </div>
            ))}
          </Panel>
        ) : null}
      </Map>
    </div>
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

      console.log(
        `Map moved to lat: ${center?.lat}, lng: ${center?.lng}.`,
        locationFilter,
      )
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
  const [showPopup, setShowPopup] = useState(true)
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
  const [searchGarages, { loading, data }] = useSearchGaragesLazyQuery()

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [variables])

  if (data?.searchGarages.length === 0) {
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
      {data?.searchGarages.map((garage) => (
        <MarkerWithPopup marker={garage} />
      ))}
    </div>
  )
}

export const SearchBox = ({
  onChange,
  value,
}: {
  onChange: ({ lat, lng }: { lat: number; lng: number }) => void
  value?: string
}) => {
  const { current: map } = useMap()
  return (
    <SearchPlaceBox
      value={value}
      setLocationInfo={(locationInfo) => {
        const lat = locationInfo.latLng[0]
        const lng = locationInfo.latLng[1]
        onChange({ lat, lng })

        map?.flyTo({
          center: { lat, lng },
          zoom: 10,
          essential: true,
        })
      }}
    />
  )
}
