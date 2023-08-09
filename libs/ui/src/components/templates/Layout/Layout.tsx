import { MenuItem, Role } from '@autospace-org/types'
import { Footer } from '@autospace-org/ui/src/components/organisms/Footer'
import { usePathname } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import { Header } from '../../organisms/Header'

interface ILayoutProps {
  children: ReactElement | ReactElement[]
  menuItems?: MenuItem[]
  sideMenuItems?: MenuItem[]
  type?: Role
}

const NoNavUrls = ['/register', '/login']

export const Layout = ({
  children,
  menuItems = [],
  sideMenuItems = [],
  type,
}: ILayoutProps) => {
  const url = usePathname()
  const [pathname, setPathname] = useState<string>('')

  useEffect(() => {
    setPathname(url)
  }, [setPathname])

  return NoNavUrls.includes(pathname) ? (
    <main>{children}</main>
  ) : (
    <>
      <Header type={type} menuItems={menuItems} sideMenuItems={sideMenuItems} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
