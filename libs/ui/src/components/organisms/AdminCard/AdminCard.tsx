import { AdminsQuery } from '@autospace-org/network/src/generated'
import { useUserStore } from '@autospace-org/store/user'
import { format } from 'date-fns'

type AdminCardProps = {
  admin: AdminsQuery['admins'][number]
}

export const AdminCard: React.FC<AdminCardProps> = ({ admin }) => {
  const uid = useUserStore((state) => state.uid)
  return (
    <>
      <div className="flex items-start gap-2">
        <h2 className="text-lg font-bold ">{admin.displayName}</h2>
        {uid === admin.uid ? (
          <span className="px-1 text-xs bg-primary">You</span>
        ) : null}
      </div>

      <div className="text-sm text-gray">
        <p>Since {format(new Date(admin.createdAt), 'PP')}</p>
        <p> {admin.uid}</p>
      </div>
      <p className="mt-1"> {admin.verificationsCount} verifications.</p>
    </>
  )
}
