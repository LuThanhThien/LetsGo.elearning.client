import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

export const InfoTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      color: 'rgba(255, 255, 255, 1)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
}));

export const PreventTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      color: 'rgba(255, 255, 255, 1)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
}));  

export const WarningTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    color: 'rgba(0, 0, 0, 1)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));  