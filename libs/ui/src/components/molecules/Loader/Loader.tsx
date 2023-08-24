import { IconLoader } from '@tabler/icons-react'
import { AlertSection } from '../../organisms/AlertSection'

export const Loader = () => <IconLoader className="animate-spin" />
export const LoaderPanel = ({ text }: { text?: string }) => (
  <AlertSection title={text}>
    <Loader />
  </AlertSection>
)
