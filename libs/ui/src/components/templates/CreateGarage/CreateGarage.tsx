import Link from 'next/link'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { Map } from '../../organisms/Map'

import {
  FormProviderCreateGarage,
  FormTypeCreateGarage,
} from '@autospace-org/forms/src/createGarage'

import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'

import { useCreateGarageMutation } from '@autospace-org/network/src/generated'
import { useImageUpload } from '@autospace-org/util'
import { notification$ } from '@autospace-org/util/subjects'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { ProgressBar } from '../../atoms/ProgressBar'
import { ViewState } from '../../organisms/Map/Map'
import { Panel } from '../../organisms/Map/Panel'
import {
  CenterOfMap,
  DefaultZoomControls,
} from '../../organisms/Map/ZoomControls/ZoomControls'
import { SearchPlaceBox } from '../../organisms/SearchPlaceBox'
import { AddSlots, MapMarker } from './components'
export interface ICreateGarageProps {}

export const CreateGarage = () => {
  return (
    <FormProviderCreateGarage>
      <CreateGarageContent />
    </FormProviderCreateGarage>
  )
}

export const initialViewState = {
  longitude: 80.2,
  latitude: 12.9,
  zoom: 10,
}

export const CreateGarageContent = ({}: ICreateGarageProps) => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useFormContext<FormTypeCreateGarage>()

  const [{ percent, uploading }, uploadImages] = useImageUpload()

  const [createGarage, { loading }] = useCreateGarageMutation()

  return (
    <div className="grid grid-cols-2 gap-2">
      <Dialog open={open} setOpen={setOpen} title={'Success.'}>
        <div>Garage created successfully.</div>
        <div className="flex items-center justify-between gap-4 mt-4">
          <Link href="/" className="underline underline-offset-4">
            Go to garages
          </Link>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Create more
          </Button>
        </div>
      </Dialog>
      <Form
        onSubmit={handleSubmit(
          async ({ description, displayName, location, slotTypes, images }) => {
            const uploadedImages = await uploadImages(images)

            const { data, errors } = await createGarage({
              variables: {
                createGarageInput: {
                  description,
                  displayName,
                  address: location,
                  slots: slotTypes,
                  images: uploadedImages,
                },
              },
            })

            if (data?.createGarage) {
              setOpen(true)
              reset()
            }
            if (errors?.length) {
              notification$.next({ message: 'Garage creation failed.' })
            }
          },
        )}
      >
        <HtmlLabel error={errors.displayName?.message} title="Display Name">
          <HtmlInput {...register('displayName')} />
        </HtmlLabel>
        <HtmlLabel title="Description" error={errors.description?.message}>
          <HtmlTextArea cols={5} {...register('description')} />
        </HtmlLabel>
        <HtmlLabel title="Address" error={errors.location?.address?.message}>
          <HtmlTextArea cols={5} {...register('location.address')} />
        </HtmlLabel>
        <HtmlLabel title="Images" error={errors.images?.message?.toString()}>
          <Controller
            control={control}
            name={`images`}
            render={({ field }) => (
              <HtmlInput
                type="file"
                accept="image/*"
                multiple={true}
                onChange={(e) => field.onChange(e?.target?.files)}
              />
            )}
          />
          {percent > 0 ? (
            <ProgressBar variant="determinate" value={percent} />
          ) : null}
        </HtmlLabel>
        <Form />
        <AddSlots />
        <Button loading={loading} type="submit">
          Create garage
        </Button>
      </Form>
      <Map initialViewState={initialViewState}>
        <MapMarker initialLocation={initialViewState} />

        <Panel position="left-top">
          <SearchPlaceBox
            onLocationChange={(location: ViewState) => {
              setValue('location.lat', location.latitude)
              setValue('location.lng', location.longitude)
            }}
          />
          <DefaultZoomControls>
            <CenterOfMap
              onClick={(latLng) => {
                const lat = parseFloat(latLng.lat.toFixed(6))
                const lng = parseFloat(latLng.lng.toFixed(6))

                setValue('location.lat', lat, { shouldValidate: true })
                setValue('location.lng', lng, { shouldValidate: true })
              }}
            />
          </DefaultZoomControls>
        </Panel>
      </Map>
    </div>
  )
}
