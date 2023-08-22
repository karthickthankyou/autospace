import { useAppSelector } from '@autospace-org/store'
import { selectDisplayName } from '@autospace-org/store/user'
import { IconUserCircle } from '@tabler/icons-react'

export interface IShowUserDisplayNameProps {}

export const ShowUserDisplayName = ({}: IShowUserDisplayNameProps) => {
  const displayName = useAppSelector(selectDisplayName)

  return (
    <div className="flex items-center gap-2">
      <IconUserCircle className="w-6 h-6" />
      <div className="text-xl">{displayName}</div>
    </div>
  )
}
