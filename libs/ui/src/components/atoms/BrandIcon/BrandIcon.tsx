import { ReactNode } from 'react'

export interface IBrandIconProps {
  children?: ReactNode
}

export const BrandIcon = ({
  children = <div className={`bg-gray-100 shadow w-2 h-5 animate-park-car `} />,
}: IBrandIconProps) => {
  return (
    <div className="inline-block overflow-hidden">
      <div
        className={`flex items-center justify-center border-2 border-yellow-500 w-4 h-8`}
      >
        {children}
      </div>
    </div>
  )
}
