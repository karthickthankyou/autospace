import { ReactNode } from 'react'
import { BrandIcon } from '../../atoms/BrandIcon'

import Link from 'next/link'
import { IconArrowBack } from '@tabler/icons-react'

export interface IAuthLayoutProps {
  children: ReactNode
  title: string
}

export const AuthLayout = ({ title, children }: IAuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-50 ">
      <div className="w-full max-w-lg p-4 mx-auto mb-16 bg-white shadow">
        <h1 className="flex gap-2 mb-2 text-xl">
          <BrandIcon /> <div>{title}</div>
        </h1>
        {children}
        <div className="mt-4 text-sm text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <IconArrowBack className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
