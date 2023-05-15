import { useNotification } from '@autospace-org/hooks/src/notifications'
import { useUserListener } from '@autospace-org/hooks/src/user'

export interface IAppLevelListenersProps {}

export const AppLevelListeners = () => {
  useUserListener()
  useNotification()
  return null
}
