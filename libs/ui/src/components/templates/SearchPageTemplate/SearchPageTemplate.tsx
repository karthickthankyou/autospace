import { Map } from '../../organisms/Map'

import { useCallback, useEffect, useState } from 'react'

import {
  IconExclamationCircle,
  IconInfoCircle,
  IconRefresh,
} from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'

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
import { Dialog } from '../../atoms/Dialog'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { CurrentLocationButton } from '../../organisms/CurrentLocationButton'
import { FilterSidebar } from '../../organisms/FilterSidebar'
import { BookSlotPopup } from '../../organisms/Map/BookSlotPopup'
import { Marker } from '../../organisms/Map/MapMarker'
import { Panel } from '../../organisms/Map/Panel'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import { SearchPlaceBox } from '../../organisms/SearchPlaceBox'
import { initialViewState } from '../CreateGarage/CreateGarage'

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
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeSearchGarage>()

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounds = target.getBounds()

      const locationFilter = {
        nw_lat: bounds?.getNorthWest().lat || 0,
        nw_lng: bounds?.getNorthWest().lng || 0,
        se_lat: bounds?.getSouthEast().lat || 0,
        se_lng: bounds?.getSouthEast().lng || 0,
      }

      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )

  return (
    <Map
      pitch={30}
      onLoad={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      {/* Query and display garages */}
      <ShowMarkers />
      <Panel position="left-top" className="bg-white/50">
        <div className="flex flex-col items-stretch gap-2 py-2">
          {/* Self managing search box. Moves map to the selected location. */}
          <SearchPlaceBox />

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
