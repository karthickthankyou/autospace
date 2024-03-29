import { Disclosure } from '@headlessui/react'
import { IconChevronDown } from '@tabler/icons-react'
import { ReactNode } from 'react'

export interface IAccordionProps {
  title: ReactNode
  children: ReactNode
  className?: string
  defaultOpen?: boolean
}

export const Accordion = ({
  title,
  children,
  className,
  defaultOpen = false,
}: IAccordionProps) => (
  <Disclosure defaultOpen={defaultOpen}>
    {({ open }) => (
      <>
        <Disclosure.Button
          className={`flex justify-between w-full py-2 font-medium ${className}`}
        >
          <span
            className={`text-left ${open ? 'font-semibold' : 'text-gray-600'}`}
          >
            {title}
          </span>
          <IconChevronDown
            className={` ${
              open ? 'transform rotate-180 text-primary-500' : 'text-gray-500'
            } w-5 h-5 `}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="w-full max-w-md px-2 pb-4 text-gray-600">
          {children}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)
