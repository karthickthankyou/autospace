import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { AuthLayoutSimple } from '@autospace-org/ui/src/components/molecules/AuthLayoutSimple'
import { Admin } from '@autospace-org/ui/src/components/templates/Admin'
import { LoginForm } from '@autospace-org/ui/src/components/templates/LoginForm'
import { WhileLoggedIn } from '@autospace-org/ui/src/components/templates/WhileLoggedIn'

export default function Home() {
  return (
    <main>
      <Container>
        <WhileLoggedIn
          notLoggedIn={
            <AuthLayoutSimple title="Login">
              <LoginForm />
            </AuthLayoutSimple>
          }
        >
          <Admin />
        </WhileLoggedIn>
      </Container>
    </main>
  )
}
