import { Card, CardProps } from "@mui/material";

export interface DefaultCardProps extends CardProps {
    noShadow?: boolean
}

export const DefaultCard = ({ noShadow, children, sx, ...others } : DefaultCardProps) => {
    const defaultCardSx =  {
        borderRadius: "5px",
        boxShadow: noShadow ? '' : 'rgba(76, 78, 100, 0.2) 0px 3px 10px 3px',
    }

    return (
        <Card
            sx={{   
                ...defaultCardSx,
                ...sx
                }}
            {...others}
        >
            {children}
        </Card>
    )
}