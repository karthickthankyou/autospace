import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ShowHide } from '../../../molecules/ShowHide'
import { Map } from '../Map'
import { Popup } from './Popup'

const meta: Meta<typeof Popup> = {
  component: Popup,
  decorators: [
    (Story) => {
      const [viewState, setViewState] = useState({
        latitude: 12.9,
        longitude: 80.2,
        zoom: 8,
      })
      return <Map initialViewState={viewState}>{Story()}</Map>
    },
  ],
}
export default meta

type Story = StoryObj<typeof Popup>

export const Primary: Story = {
  args: {},
  render: () => {
    const [open, setOpen] = useState(true)
    const [open2, setOpen2] = useState(true)

    return (
      <>
        <ShowHide show={open}>
          <Popup
            show={open}
            setShow={setOpen}
            latitude={13}
            longitude={80}
            onClose={() => setOpen(false)}
          >
            <div className="max-w-sm p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </Popup>
        </ShowHide>
        <ShowHide show={open2}>
          <Popup
            show={open}
            setShow={setOpen}
            latitude={13}
            longitude={79}
            onClose={() => setOpen2(false)}
          >
            <div className="max-w-sm p-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim id
              tempore quia sit adipisci facilis, error laudantium nisi
              consectetur repellendus repudiandae ut.
            </div>
          </Popup>
        </ShowHide>
      </>
    )
  },
}
