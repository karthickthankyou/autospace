import { Dialog, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import {
  Dispatch,
  Fragment,
  ReactElement,
  SetStateAction,
  useEffect,
} from 'react'

import { IconX } from '@tabler/icons-react'

export interface ISidebarProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: (string | ReactElement | null) | (string | ReactElement | null)[]
  className?: string
  overlayBlur?: boolean
  overlayDark?: boolean
  show?: boolean
}

const Header = ({
  children,
  className,
}: Pick<ISidebarProps, 'children' | 'className'>) => (
  <div className={`relative p-4 text-xl font-semibold ${className}`}>
    {children}
  </div>
)

const Footer = ({
  children,
  show,
}: Pick<ISidebarProps, 'children' | 'show' | 'className'>) => (
  <Transition
    show={show}
    enter="transition-all duration-300"
    enterFrom="translate-y-10 "
    enterTo="translate-y-0"
    leave="transition-all duration-300"
    leaveFrom="translate-y-0"
    leaveTo="translate-y-10"
  >
    <div className="px-4 py-2 border-t">{children}</div>
  </Transition>
)

const Body = ({
  children,
  className,
}: Pick<ISidebarProps, 'children' | 'className'>) => (
  <div
    className={`flex flex-col flex-grow  shadow-inner p-4 pb-12 overflow-y-scroll ${className} `}
  >
    {children}
  </div>
)

const Sidebar = ({
  open,
  setOpen,
  children,
  overlayBlur = false,
  overlayDark = true,
}: ISidebarProps) => {
  const url = usePathname()
  useEffect(() => {
    setOpen(false)
  }, [url, setOpen])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={`fixed inset-0  ${overlayDark && 'bg-black/50'}  ${
                overlayBlur && 'backdrop-filter backdrop-blur-sm'
              }`}
            />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-150"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-100"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="flex flex-col w-screen max-w-md">
                <button
                  type="button"
                  className="absolute top-0 right-0 z-10 m-2 ml-auto rounded-full text-primary bg-white/80"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <IconX className="w-6 h-6 p-1" aria-hidden="true" />
                </button>
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

Sidebar.Header = Header
Sidebar.Body = Body
Sidebar.Footer = Footer

export { Sidebar }
