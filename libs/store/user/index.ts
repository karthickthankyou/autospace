import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type Role = 'admin' | 'cook'

type UserSliceType = {
  uid?: string
  displayName?: string
  email?: string
  roles?: Role[]
  token?: string
  loaded: boolean
  setUser: (payload: Partial<UserSliceType>) => void
  resetUser: () => void
}

export const useUserStore = create<UserSliceType>(
  devtools(
    (set) => ({
      uid: undefined,
      displayName: undefined,
      email: undefined,
      roles: undefined,
      token: undefined,
      loaded: false,

      setUser: (payload: Partial<UserSliceType>) =>
        set((state) => ({ ...state, ...payload, loaded: true })),
      resetUser: () => set({ loaded: true }),
    }),
    { name: 'user' },
  ),
)
