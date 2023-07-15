import {
  ValetsLazyQueryHookResult,
  ValetsQuery,
} from '@autospace-org/network/src/generated'
import Image from 'next/image'
import { format } from 'date-fns'

export interface IValetCardProps {
  valet: ValetsQuery['valets'][0]
}

export const ValetCard = ({ valet }: IValetCardProps) => {
  return (
    <div className="space-y-2">
      <div className="p-1 border-2 shadow-lg border-primary">
        <Image
          className="object-cover w-full aspect-square "
          width={200}
          height={300}
          src={valet.image || ''}
          alt={''}
        />
      </div>
      <div>
        <div className="font-semibold ">{valet.displayName}</div>
        <div className="mb-1 text-xs ">{valet.uid}</div>
        <div className="text-xs text-gray">
          {format(new Date(valet.createdAt), 'PP')}
        </div>
      </div>
    </div>
  )
}
