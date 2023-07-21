import { Admin } from '@autospace-org/ui/src/components/templates/Admin'
import { WhileLoggedIn } from '@autospace-org/ui/src/components/templates/WhileLoggedIn'
import { AuthLayoutSimple } from '@autospace-org/ui/src/components/molecules/AuthLayoutSimple'
import { LoginForm } from '@autospace-org/ui/src/components/templates/LoginForm'
import { Container } from '@autospace-org/ui/src/components/atoms/Container'

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
