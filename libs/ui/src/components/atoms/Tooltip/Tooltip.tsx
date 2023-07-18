import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip'

export const Tooltip = ({ children, title, ...props }: TooltipProps) => (
  <MuiTooltip
    classes={{
      tooltip: ` bg-white text-sm  text-black shadow-lg shadow/black/30 `,
      arrow: `text-white`,
    }}
    // TransitionComponent={Fade}
    TransitionProps={{ timeout: 0 }}
    title={title}
    {...props}
  >
    {children}
  </MuiTooltip>
)
