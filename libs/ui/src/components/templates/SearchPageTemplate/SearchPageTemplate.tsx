import { Map } from '../../organisms/Map'

import { useEffect, useState } from 'react'

import {
  LocationInfo,
  useSearchLocation,
} from '@autospace-org/hooks/src/location'
import {
  IconCurrentLocation,
  IconExclamationCircle,
  IconInfoCircle,
  IconRefresh,
} from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'
import { Button } from '../../atoms/Button'

import { useConvertSearchFormToVariables } from '@autospace-org/forms/src/adapters/searchFormAdapter'
import { FormProviderBookSlot } from '@autospace-org/forms/src/bookSlot'
import { FormTypeSearchGarage } from '@autospace-org/forms/src/searchGarages'
import {
  SearchGaragesQuery,
  useSearchGaragesCountLazyQuery,
  useSearchGaragesLazyQuery,
} from '@autospace-org/network/src/generated'
import { toLocalISOString, useKeypress } from '@autospace-org/util'
import { useMap, ViewStateChangeEvent } from 'react-map-gl'
import { Autocomplete } from '../../atoms/Autocomplete'
import { Dialog } from '../../atoms/Dialog'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { FilterSidebar } from '../../organisms/FilterSidebar'
import { BookSlotPopup } from '../../organisms/Map/BookSlotPopup'
import { Marker } from '../../organisms/Map/MapMarker'
import { Panel } from '../../organisms/Map/Panel'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
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
            map?.flyTo({ center: { lat: latitude, lng: longitude }, zoom: 10 })
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
    <Map pitch={30} onZoomEnd={handleMapChange} onDragEnd={handleMapChange}>
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
              min={toLocalISOString(new Date()).slice(0, 16)}
              {...register('startTime')}
            />
          </HtmlLabel>

          <HtmlLabel title="End time" error={errors.endTime?.message}>
            <HtmlInput
              min={toLocalISOString(new Date()).slice(0, 16)}
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

export const MarkerWithPopup = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showPopup, setShowPopup] = useState(false)
  useKeypress(['Escape'], () => setShowPopup(false))

  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot>
          <BookSlotPopup garage={marker} />
        </FormProviderBookSlot>
      </Dialog>

      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  )
}

export const ZOOM_LIMIT = 10

export const ShowMarkers = () => {
  const [garages, setGarages] = useState<SearchGaragesQuery['searchGarages']>(
    [],
  )

  const { current: map } = useMap()
  const [searchGarages, { loading, data }] = useSearchGaragesLazyQuery()
  const [searchGaragesCount, { loading: loadingCount, data: dataCount }] =
    useSearchGaragesCountLazyQuery()

  const { variables } = useConvertSearchFormToVariables()

  const TOO_ZOOMED_OUT = (map?.getZoom() || 0) < ZOOM_LIMIT

  useEffect(() => {
    if (TOO_ZOOMED_OUT && variables) {
      searchGaragesCount({
        variables: {
          dateFilter: variables.dateFilter,
          locationFilter: variables.locationFilter,
          slotsFilter: variables.slotsFilter,
        },
      })
      return
    }
    if (variables) {
      searchGarages({ variables })
    }
  }, [variables])
  useEffect(() => {
    if (data?.searchGarages) {
      setGarages(data.searchGarages || [])
    }
  }, [data?.searchGarages])

  if (data?.searchGarages.length === 0) {
    return (
      <Panel position="center-center" className="bg-white/50">
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  if (TOO_ZOOMED_OUT) {
    return (
      <Panel position="center-center">
        <div className="p-2 bg-white">Too zoomed out</div>
      </Panel>
    )
  }

  return (
    <>
      {loading || loadingCount ? (
        <Panel position="center-bottom">
          <IconRefresh className="animate-spin-reverse" />
        </Panel>
      ) : null}
      {garages.map((garage) => (
        <MarkerWithPopup key={garage.id} marker={garage} />
      ))}
    </>
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
          map?.flyTo({ center: { lat: latLng[0], lng: latLng[1] }, zoom: 10 })
        }
      }}
    />
  )
}
