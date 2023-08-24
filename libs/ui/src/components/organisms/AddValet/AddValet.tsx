import { useFormCreateValet } from '@autospace-org/forms/src/createValet'
import {
  namedOperations,
  useCreateValetMutation,
} from '@autospace-org/network/src/generated'
import { useImageUpload } from '@autospace-org/util'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { ImagePreview } from '../../organisms/ImagePreview'

export interface IAddValetProps {}

export const AddValet = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    resetField,
    formState: { errors },
  } = useFormCreateValet()
  const [createValet, { loading, data }] = useCreateValetMutation()
  const [open, setOpen] = useState(false)
  const [{ percent, uploading }, uploadImages] = useImageUpload()

  const { image } = watch()

  useEffect(() => {
    if (open && data?.createValet) {
      reset()
      setOpen(false)
    }
  }, [data])
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Valet</Button>
      <Dialog
        widthClassName="max-w-xl"
        open={open}
        setOpen={setOpen}
        title={'Create Valet'}
      >
        <Form
          onSubmit={handleSubmit(
            async ({ displayName, email, password, licenceID, image }) => {
              const images = await uploadImages(image)

              await createValet({
                variables: {
                  createValetInput: {
                    displayName,
                    email,
                    password,
                    licenceID,
                    image: images[0],
                  },
                },
                awaitRefetchQueries: true,
                refetchQueries: [namedOperations.Query.companyValets],
              })
            },
          )}
        >
          <div className="flex items-stretch gap-2">
            <div className="h-full w-36">
              <ImagePreview
                src={image?.[0]}
                clearImage={() => resetField('image')}
              >
                <Controller
                  control={control}
                  name={`image`}
                  render={({ field }) => (
                    <HtmlInput
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={(e) => field.onChange(e?.target?.files)}
                    />
                  )}
                />
              </ImagePreview>
            </div>
            <div className="flex-grow space-y-2">
              <HtmlLabel title="Email" error={errors.email?.message}>
                <HtmlInput
                  placeholder="Email of the valet"
                  {...register('email')}
                />
              </HtmlLabel>
              <HtmlLabel title="Password" error={errors.password?.message}>
                <HtmlInput
                  type="password"
                  placeholder="******"
                  {...register('password')}
                />
              </HtmlLabel>
              <HtmlLabel
                title="Display Name"
                error={errors.displayName?.message}
              >
                <HtmlInput
                  placeholder="Name of the valet"
                  {...register('displayName')}
                />
              </HtmlLabel>
              <HtmlLabel title="Licence ID" error={errors.licenceID?.message}>
                <HtmlInput
                  placeholder="Licence ID of the valet"
                  {...register('licenceID')}
                />
              </HtmlLabel>
            </div>
          </div>

          <Button loading={uploading || loading} type="submit">
            Create valet
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
