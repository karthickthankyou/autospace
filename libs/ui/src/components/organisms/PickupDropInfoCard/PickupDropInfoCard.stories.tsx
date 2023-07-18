import type { Meta, StoryObj } from '@storybook/react'
import { PickupDropInfoCard } from './PickupDropInfoCard'
import { BookingStatus } from '@autospace-org/network/src/generated'
import { rest } from 'msw'

const meta: Meta<typeof PickupDropInfoCard> = {
  component: PickupDropInfoCard,
}
export default meta

type Story = StoryObj<typeof PickupDropInfoCard>

export const Primary: Story = {
  args: {
    booking: { id: 1, time: new Date().toISOString() },
    end: { lat: 12, lng: 80 },
    start: { lat: 11, lng: 79 },
    targetStatus: BookingStatus.ValetPickedUp,
  },
  parameters: {
    msw: {
      handlers: [
        rest.get('https://api.mapbox.com/*', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              routes: [
                {
                  legs: [
                    {
                      steps: [
                        {
                          maneuver: {
                            location: [80.280289, 13.052874],
                          },
                        },
                        {
                          maneuver: {
                            location: [80.280475, 13.053198],
                          },
                        },
                        {
                          maneuver: {
                            location: [80.281142, 13.052975],
                          },
                        },
                        {
                          maneuver: {
                            location: [80.281699, 13.055986],
                          },
                        },
                        {
                          maneuver: {
                            location: [80.281826, 13.055994],
                          },
                        },
                        {
                          maneuver: {
                            location: [80.28373, 13.064249],
                          },
                        },
                      ],
                    },
                  ],
                  distance: 123456, // Add appropriate mock distance here
                },
              ],
            }),
          )
        }),
      ],
    },
  },
}
