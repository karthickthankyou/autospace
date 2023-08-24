import { register as registerUser } from '@autospace-org/network/src/auth'
import Link from 'next/link'
import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'

import { useFormRegister } from '@autospace-org/forms/src/register'
import { Form } from '../../atoms/Form'

import { notification$ } from '@autospace-org/util/subjects'
import { useRouter } from 'next/router'

import { useAsync } from '@autospace-org/hooks/src/fetcher'
import { useEffect } from 'react'

export interface ISignupFormProps {
  className?: string
}

export const RegisterForm = ({ className }: ISignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const { loading, error, success, callAsyncFn } = useAsync(
    registerUser,
    (err: any) => {
      console.log('err', err)
      if (err.code === 'auth/email-already-in-use') {
        return "Email already in use! Just kidding, or am I? Honestly, I'm not sure if that email exists or not. Maybe I've said too much. Forget I said anything!"
      }
      return 'Something went wrong. Please try again.'
    },
  )

  const router = useRouter()

  useEffect(() => {
    if (success) router.push('/')
  }, [success])

  useEffect(() => {
    if (error) notification$.next({ message: error, duration: 8000 })
  }, [error])

  return (
    <Form onSubmit={handleSubmit(callAsyncFn)}>
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className="text-black"
          placeholder="Enter the email."
          {...register('email')}
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-black"
          type="password"
          placeholder="······"
          {...register('password')}
        />
      </HtmlLabel>
      <HtmlLabel title="Display name" error={errors.displayName?.message}>
        <HtmlInput
          className="text-black"
          placeholder="Enter your name."
          {...register('displayName')}
        />
      </HtmlLabel>
      {Object.keys(errors).length ? (
        <div className="text-xs text-gray-600">
          Please fix the above {Object.keys(errors).length} errors
        </div>
      ) : null}
      <Button type="submit" loading={loading} fullWidth>
        Create account
      </Button>
      <div className="mt-4 text-sm ">
        Already have an autospace account?
        <br />
        <Link href="/login" className="font-bold underline underline-offset-4">
          Login
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}
