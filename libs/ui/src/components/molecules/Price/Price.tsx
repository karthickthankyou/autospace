import { ReactNode } from 'react'

export interface IPriceProps {
  children: ReactNode
  className?: string
}

export const Price = ({ children, className }: IPriceProps) => {
  return <div className={`${className}`}>Rs.{children}</div>
}
