import { AlertSection } from '../AlertSection'
import Link from 'next/link'

export interface IAlertUnauthenticatedProps {}

export const AlertUnauthenticated = ({}: IAlertUnauthenticatedProps) => {
  return (
    <AlertSection>
      <div>You are not logged in.</div>
      <Link href="/login">Login</Link>
    </AlertSection>
  )
}
