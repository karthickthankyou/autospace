import Link from 'next/link'
import { AlertSection } from '../AlertSection'

export interface IAlertUnauthenticatedProps {}

export const AlertUnauthenticated = ({}: IAlertUnauthenticatedProps) => {
  return (
    <AlertSection title="Unauthorized">
      <div>You are not logged in.</div>
      <Link
        href="/login"
        className="font-semibold underline underline-offset-4"
      >
        Login
      </Link>
    </AlertSection>
  )
}
