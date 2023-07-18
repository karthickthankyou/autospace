import { useUserStore } from '@autospace-org/store/user'
import { LoaderPanel } from '../../molecules/Loader'
import { AlertUnauthenticated } from '../../organisms/AlertUnauthenticated'
import {
  namedOperations,
  useCompanyValetsQuery,
  useCreateValetMutation,
} from '@autospace-org/network/src/generated'
import { useFormCreateValet } from '@autospace-org/forms/src/createValet'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { Dialog } from '../../atoms/Dialog'
import { useEffect, useState } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@autospace-org/hooks/src/async'
import { ValetCard } from '../../organisms/ValetCard'
import { useImageUpload } from '@autospace-org/util'
import { ImagePreview } from '../../organisms/ImagePreview'
import { Controller } from 'react-hook-form'

export interface IManageValetsProps {}

export const ManageValets = ({}: IManageValetsProps) => {
  const { uid, loaded } = useUserStore()
  if (!loaded) {
    return <LoaderPanel />
  }

  if (!uid) {
    return <AlertUnauthenticated />
  }

  return (
    <div>
      <div className="flex justify-end">
        <AddValet />
      </div>
      <ListValets uid={uid} />
    </div>
  )
}

export const ListValets = ({ uid }: { uid: string }) => {
  const { take, skip, setSkip, setTake } = useTakeSkip()
  const { data, loading } = useCompanyValetsQuery({ variables: { skip, take } })
  return (
    <ShowData
      loading={loading}
      pagination={{
        resultCount: data?.companyValets.length,
        totalCount: undefined,
        take,
        skip,
        setSkip,
        setTake,
      }}
      title={undefined}
    >
      {data?.companyValets.map((valet) => (
        <ValetCard key={valet.uid} valet={valet} />
      ))}
    </ShowData>
  )
}

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
              console.log('data ', data)
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
              <HtmlLabel title="Password" error={errors.email?.message}>
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
