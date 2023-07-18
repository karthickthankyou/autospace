import * as React from 'react'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import MuiTimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import {
  IconMoonStars,
  IconSun,
  IconSunrise,
  IconSunset,
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { SimpleDate } from '../../organisms/PickupDropInfoCard/PickupDropInfoCard'

export type TimelineStepType = {
  children: React.ReactNode
  className?: string
}

export const IconType = ({ time }: { time: string }) => {
  const date = new Date(time)
  const hour = date.getHours() // get the hour in UTC

  if (hour >= 4 && hour < 10) return <IconSunrise className="w-5 h-5" />
  if (hour >= 10 && hour < 16) return <IconSun className="w-5 h-5" />
  if (hour >= 16 && hour < 20) return <IconSunset className="w-5 h-5" />
  return <IconMoonStars className="w-5 h-5" />
}

export const TimelineItem = ({
  children,
  className,
  time,
}: TimelineStepType & { time: string }) => {
  return (
    <MuiTimelineItem
      classes={{ missingOppositeContent: 'before:hidden', root: 'p-0 py-2' }}
      className={`p-0 ${className}`}
    >
      <TimelineSeparator>
        <div className="p-1">
          <IconType time={time} />
        </div>
        <TimelineConnector className="border border-white" />
      </TimelineSeparator>
      <TimelineContent classes={{ root: 'p-0 pl-1' }}>
        {children}
      </TimelineContent>
    </MuiTimelineItem>
  )
}

export const Timeline = ({ ref, ...props }: TimelineProps) => {
  return <MuiTimeline {...props} classes={{ root: 'p-0' }} />
}
