import Link from 'next/link'
import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'

import { FormTypeLogin, useFormLogin } from '@autospace-org/forms/src/login'
import { Form } from '../../atoms/Form'
import { FormError } from '../../atoms/FormError'

import { useAppSelector } from '@autospace-org/store'
import { selectUid } from '@autospace-org/store/user'

import { useAsync } from '@autospace-org/hooks/src/fetcher'
import { login } from '@autospace-org/network/src/auth'
import { notification$ } from '@autospace-org/util/subjects'
import { useRouter } from 'next/router'

export interface ILoginFormProps {
  className?: string
}

const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { loading, error, success, callAsyncFn } = useAsync(
    (data: FormTypeLogin) => login(data),
    (err: any) => {
      if (err.code === 'auth/user-not-found') {
        return 'Invalid email.'
      } else if (err.code === 'auth/wrong-password') {
        return 'Invalid password.'
      }
      return 'Something went wrong. Please try again.'
    },
  )

  const router = useRouter()

  const uid = useAppSelector(selectUid)

  if (uid) {
    notification$.next({ message: 'Logged in.' })
    router.push('/')
  }

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        await callAsyncFn({ email, password })
      })}
    >
      <HtmlLabel
        className="text-black"
        title="Email"
        error={errors.email?.message}
      >
        <HtmlInput placeholder="Enter the email." {...register('email')} />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-black"
          type="password"
          placeholder="********"
          {...register('password')}
        />
      </HtmlLabel>
      <Button loading={loading} type="submit" fullWidth>
        Login
      </Button>
      {error ? <FormError error={error.message} /> : null}
      <div className="mt-4 text-sm">
        Do not have a common kitchen account?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}

export { LoginForm }
