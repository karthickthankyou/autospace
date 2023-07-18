import type { Meta, StoryObj } from '@storybook/react'
import { Timeline, TimelineItem } from './Timeline'

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  decorators: [
    (Story) => <div className="min-h-screen bg-gray-50">{Story()}</div>,
  ],
}
export default meta

type Story = StoryObj<typeof Timeline>

export const Primary: Story = {
  render: () => {
    return (
      <Timeline>
        <TimelineItem time={'12:00'}>
          <div>Time is 12</div>
          <div className="flex items-center justify-center h-64 text-sm bg-white text-gray">
            Content
          </div>
        </TimelineItem>
        <TimelineItem time={'18:00'}>
          <div>Time is 18</div>
          <div className="flex items-center justify-center h-64 text-sm bg-white text-gray">
            Content
          </div>
        </TimelineItem>
      </Timeline>
    )
  },
}
