import { auth } from '@autospace-org/network/src/config/firebase'

import { useAppDispatch } from '@autospace-org/store'
import { resetUser, setUser } from '@autospace-org/store/user'

import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

export const useUserListener = () => {
  //   useRefreshToken()

  const dispatch = useAppDispatch()

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          dispatch(resetUser())
          return
        }

        const tokenResult = await auth.currentUser?.getIdTokenResult()
        const roles = tokenResult?.claims.roles || []
        const { displayName, email, uid } = user

        dispatch(
          setUser({
            uid,
            email: email || '',
            displayName: displayName || '',
            roles,
            token: tokenResult?.token,
          }),
        )
      }),
    [],
  )
}
