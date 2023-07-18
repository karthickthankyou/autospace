import { useUserStore } from '@autospace-org/store/user'
import { Admin } from '@autospace-org/ui/src/components/templates/Admin'
import { AuthLayoutSimple } from '@autospace-org/ui/src/components/molecules/AuthLayoutSimple'
import { LoginForm } from '@autospace-org/ui/src/components/templates/LoginForm'
import { Container } from '@autospace-org/ui/src/components/atoms/Container'

export default function Home() {
  const { uid, roles } = useUserStore((state) => ({
    uid: state.uid,
    roles: state.roles,
  }))

  if (!uid) {
    return (
      <AuthLayoutSimple title="Login">
        <LoginForm />
      </AuthLayoutSimple>
    )
  }
  return (
    <main>
      <Container>
        <Admin />
      </Container>
    </main>
  )
}
