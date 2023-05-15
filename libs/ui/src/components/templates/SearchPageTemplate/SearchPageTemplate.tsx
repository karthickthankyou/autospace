import { Map } from '../../organisms/Map'
import { useRouter } from 'next/router'
import { SearchPlaceBox } from '../../organisms/SearchPlaceBox'
import { useCallback, useEffect, useRef, useState } from 'react'
import { stringify } from 'querystring'

import {
  LocationInfo,
  useCurrentLocation,
} from '@autospace-org/hooks/src/location'
import { Button } from '../../atoms/Button'
import {
  IconCurrentLocation,
  IconExclamationCircle,
  IconFilter,
  IconRefresh,
} from '@tabler/icons-react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PulsingDot } from '../../atoms/Dot/Dot'
import { useDebouncedValue } from '@autospace-org/hooks/src/async'

import {
  FormProviderSearchGarage,
  FormTypeSearchGarage,
} from '@autospace-org/forms/src/searchGarages'
import { searchFormAdapter } from '@autospace-org/forms/src/adapters/searchFormAdapter'
import { Container } from '../../atoms/Container'
import { FilterSidebar } from '../../organisms/FilterSidebar'
import { Panel } from '../../organisms/Map/Panel'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import {
  SearchGaragesQueryVariables,
  SlotType,
  useSearchGaragesQuery,
} from '@autospace-org/network/src/generated'
import { Marker } from '../../organisms/Map/MapMarker'
import { Popup } from '../../organisms/Map/Popup'
import { BookSlotPopup } from '../../organisms/Map/BookSlotPopup'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useMap } from 'react-map-gl'

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

export const SearchPageTemplate = () => {
  const [openFilter, setOpenFilter] = useState(false)

  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext<FormTypeSearchGarage>()

  const { setCurrentLocation } = useCurrentLocation({
    setLocationInfo: (currentLocation: LocationInfo) =>
      setValue('locationInfo', currentLocation),
  })

  return (
    <div>
      <Map>
        <MapInitialPosition
          lng={80.2707}
          lat={13.0827}
          onMoveEnd={({ lat, lng }) => {
            setValue('locationInfo.lat', lat)
            setValue('locationInfo.lng', lng)
          }}
        />
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
          <FilterSidebar open={openFilter} setOpen={setOpenFilter} />

          <div className="flex ">
            <Button
              variant="text"
              className="hover:bg-gray-200"
              onClick={() => {
                setCurrentLocation()
              }}
            >
              <IconCurrentLocation className="stroke-1.5" />
            </Button>
            <Button
              variant="text"
              onClick={() => setOpenFilter(true)}
              className=" hover:bg-gray-200"
            >
              <IconFilter className="stroke-1.5 " />
              {dirtyFields.length ? <PulsingDot /> : null}
            </Button>
          </div>
        </Panel>
        <Panel position="right-center">
          <DefaultZoomControls />
        </Panel>
        {errors.length ? (
          <Panel position="center-bottom">
            {Object.entries(errors).map(([key, value]) => (
              <div className="flex items-center gap-1">
                <IconExclamationCircle />
                <div className="font-bold">
                  {key}: {value.message}
                </div>
              </div>
            ))}
          </Panel>
        ) : null}

        <ShowMarkers />
      </Map>
    </div>
  )
}

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<SearchGaragesQueryVariables | null>(null)

  const {
    setError,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarage>()
  const formState = useWatch<FormTypeSearchGarage>()

  const debouncedForm = useDebouncedValue(formState, 500)

  useEffect(() => {
    setVariables(searchFormAdapter(dirtyFields, debouncedForm, setError))
  }, [debouncedForm])

  // Convert form data to query variables
  return { variables }
}

export const MapInitialPosition = ({
  lat,
  lng,
  onMoveEnd,
}: {
  lat: number
  lng: number
  onMoveEnd: ({ lat, lng }: { lat: number; lng: number }) => void
}) => {
  const { current: map } = useMap()

  useEffect(() => {
    map?.flyTo({ center: { lat, lng }, zoom: 12 })
  }, [lat, lng, map])

  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map?.getCenter()
      if (!center) {
        return
      }
      console.log(`Map moved to lat: ${center?.lat}, lng: ${center?.lng}`)
      onMoveEnd({ lat: center?.lat, lng: center?.lng })
    }

    map?.on('moveend', handleMoveEnd)

    // cleanup
    return () => {
      map?.off('moveend', handleMoveEnd)
    }
  }, [map])

  return null
}

export const ShowMarkers = () => {
  const { variables } = useConvertSearchFormToVariables()

  const { loading, data } = useSearchGaragesQuery({
    variables: variables!,
  })

  return (
    <div>
      <Panel position="center-bottom">
        <IconRefresh className="animate-spin-reverse" />
      </Panel>
      {data?.searchGarages.map((garage) => (
        <Marker
          key={garage.id}
          latitude={garage.address.lat}
          longitude={garage.address.lng}
        >
          <Popup longitude={garage.address.lng} latitude={garage.address.lat}>
            <BookSlotPopup garage={garage} />
          </Popup>
        </Marker>
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
