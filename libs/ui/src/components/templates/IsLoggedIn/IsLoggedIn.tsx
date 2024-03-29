import { useAppSelector } from '@autospace-org/store'
import { selectUser } from '@autospace-org/store/user'
import Link from 'next/link'
import { ReactNode } from 'react'
import { LoaderPanel } from '../../molecules/Loader'
import { AlertSection } from '../../organisms/AlertSection'

type RenderPropChild = (uid: string) => ReactNode

export const IsLoggedIn = ({
  children,
  notLoggedIn,
}: {
  children: RenderPropChild | ReactNode
  notLoggedIn?: ReactNode
}) => {
  const { uid, loaded } = useAppSelector(selectUser)

  if (!loaded) {
    return <LoaderPanel text="Loading user..." />
  }

  if (!uid) {
    if (notLoggedIn) {
      return <>{notLoggedIn}</>
    } else {
      return (
        <AlertSection title="You are not logged in.">
          <Link href="/login">Login</Link>
        </AlertSection>
      )
    }
  }

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(uid)
        : children}
    </>
  )
}
