import { useUserStore } from '@autospace-org/store/user'
import polyline from '@mapbox/polyline'

import { useMapboxDirections } from '@autospace-org/hooks/src/map'
import { Map } from 'react-map-gl'

import { LoaderPanel } from '../../molecules/Loader'
import { AlertSection } from '../../organisms/AlertSection'
import {
  useValetDropsLazyQuery,
  useValetPickupsLazyQuery,
} from '@autospace-org/network/src/generated'
import { useEffect, useState } from 'react'
import { Tab, Tabs } from '../../molecules/Tabs'
import { TabPanel } from '../../molecules/Tabs/Tabs'
import { Container } from '../../atoms/Container'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@autospace-org/hooks/src/async'
import { format } from 'date-fns'

export interface IValetHomeProps {}

export const ValetHome = ({}: IValetHomeProps) => {
  const { uid, loaded } = useUserStore((s) => ({
    uid: s.uid,
    loaded: s.loaded,
  }))
  const [value, setValue] = useState<0 | 1>(0)

  if (!loaded) {
    return <LoaderPanel />
  }

  if (!uid) {
    return <AlertSection>You are not logged in.</AlertSection>
  }

  return (
    <Container>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab label={'Pickup'} />
        <Tab label={'Drop'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowPickups uid={uid} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowDrops uid={uid} />
      </TabPanel>
    </Container>
  )
}

export const ShowPickups = ({ uid }: { uid: string }) => {
  const [getValetPickups, { loading, data }] = useValetPickupsLazyQuery()
  console.log('data ', data)

  useEffect(() => {
    getValetPickups()
  }, [uid])

  const { setSkip, setTake, skip, take } = useTakeSkip()

  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.valetPickups.length,
        totalCount: undefined,
      }}
      title={undefined}
    >
      {data?.valetPickups.map((pickup) => (
        <div key={pickup.id}>
          <StaticMap
            start={{
              lat: pickup.valetAssignment.pickupLat,
              lng: pickup.valetAssignment.pickupLng,
            }}
            end={pickup.slot.garage.address}
          />
          <div>{pickup.id}</div>
          <div>{format(new Date(pickup.startTime), 'p')}</div>
          <div className="text-xs text-gray">
            {format(new Date(pickup.startTime), 'PP')}
          </div>{' '}
        </div>
      ))}
    </ShowData>
  )
}

export const ShowDrops = ({ uid }: { uid: string }) => {
  const [getValetDrops, { loading, data }] = useValetDropsLazyQuery()
  console.log('data ', data)

  const { setSkip, setTake, skip, take } = useTakeSkip()

  useEffect(() => {
    getValetDrops()
  }, [uid])

  return (
    <ShowData
      loading={false}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.valetDrops.length,
        totalCount: undefined,
      }}
      title={undefined}
    >
      {data?.valetDrops.map((drop) => (
        <div className="" key={drop.id}>
          <StaticMap
            start={{
              lat: drop.valetAssignment.returnLat || 0,
              lng: drop.valetAssignment.returnLng || 0,
            }}
            end={drop.slot.garage.address}
          />
          <div>{drop.id}</div>
          <div>{format(new Date(drop.endTime), 'p')}</div>
          <div className="text-xs text-gray">
            {format(new Date(drop.endTime), 'PP')}
          </div>
        </div>
      ))}
    </ShowData>
  )
}

export const StaticMap = ({
  start,
  end,
  padding = [100, 100, 100],
  pitch = 45,
}: {
  start: { lng: number; lat: number }
  end: { lng: number; lat: number }
  padding?: [number, number, number]
  pitch?: number
}) => {
  const { data, distance, loading, error } = useMapboxDirections(start, end)
  // Convert the coordinates to a polyline
  if (!data) {
    return null
  }

  console.log('data ', data)

  const encodedPolyline = polyline.fromGeoJSON({
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: data,
    },
    properties: {},
  })
  // Compute the midpoint between start and end points
  const midPoint = {
    lat: (start.lat + end.lat) / 2,
    lng: (start.lng + end.lng) / 2,
  }

  const boundingBox = [
    Math.min(start.lng, end.lng),
    Math.min(start.lat, end.lat),
    Math.max(start.lng, end.lng),
    Math.max(start.lat, end.lat),
  ].join(',')

  const paddingString = padding.join(',')

  console.log(
    'encodedPolyline ',
    encodedPolyline,
    encodeURIComponent(encodedPolyline),
  )

  // Choose a suitable zoom level (you might want to adjust this based on your needs)

  //   const url = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-a+9ed4bd(${
  //     start.lng
  //   },${start.lat}),pin-s-b+000(${end.lng},${
  //     end.lat
  //   }),path-5+f44-0.5(${encodeURIComponent(
  //     encodedPolyline,
  //   )})/auto/300x300?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-a+9ed4bd(${
    start.lng
  },${start.lat}),pin-s-b+000(${end.lng},${
    end.lat
  }),path-5+f44-0.5(${encodeURIComponent(encodedPolyline)})/${midPoint.lng},${
    midPoint.lat
  },[${boundingBox}]/500x500?access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  }`

  const url2 = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/
  pin-s-a+9ed4bd(${start.lng},${start.lat}),pin-s-b+000(${end.lng},${
    end.lat
  }),path-5+f44-0.5(${encodeURIComponent(encodedPolyline)})/
  ${boundingBox}/500x500?padding=${paddingString}&access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  }`

  const url3 = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/[${boundingBox}]/400x400?padding=${paddingString}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  const url4 = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/path-5+000(${encodeURIComponent(
    encodedPolyline,
  )}),pin-s-a+000(${start.lng},${start.lat}),pin-s-b+000(${end.lng},${
    end.lat
  })/[${boundingBox}]/400x400?padding=${paddingString}&access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  }`
  const url5 = `https://api.mapbox.com/styles/v1/iamkarthick/clk4em1h900i201pf3jvuei21/static/pin-s-a+000(${
    start.lng
  },${start.lat}),pin-s-b+000(${end.lng},${
    end.lat
  }),path-2+000(${encodeURIComponent(
    encodedPolyline,
  )})/[${boundingBox}]/400x400?padding=${paddingString}&access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  }`

  // mapbox://styles/iamkarthick/clk4em1h900i201pf3jvuei21
  // mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3

  const url6 = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-a+000(-87.321536,36.584454),pin-s-b+000(-85.855218,37.690038),path-2+000(%7Dkh~Ez%7B%7DsO%7CHUtCurC%7DxCkhC%7D~BqvIuc_%40o~l%40oaI%7DaUrs%40kkL%7D~Iso%2FqHoyGsiKa%60TpQcRdlGusK_DEiz%40w%5EcwOakJurAizT%7BhCugF_bBenSs%60OclZkdCw%5DmgEwyDogLgfBatEubCmkGxa%40icLe_Do_Spf%40cw%5D%7DsEgOaDgT%7B%5BzFyIk~Bts%40)/auto/500x500?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  return <img src={url5} alt="Map" className="w-full shadow-xl aspect-square" />
}
