import { useFormCreateValet } from '@autospace-org/forms/src/createValet'
import { useTakeSkip } from '@autospace-org/hooks/src/async'
import {
  namedOperations,
  useCompanyValetsQuery,
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
import { ShowData } from '../../organisms/ShowData'
import { ValetCard } from '../../organisms/ValetCard'
import { WhileLoggedIn } from '../WhileLoggedIn'

export interface IManageValetsProps {}

export const ManageValets = ({}: IManageValetsProps) => {
  return (
    <div>
      <WhileLoggedIn>
        {(uid) => (
          <>
            <div className="flex justify-end">
              <AddValet />
            </div>
            <ListValets uid={uid} />
          </>
        )}
      </WhileLoggedIn>
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
