import { Colors, FontSize } from "@/@share/lib/style";
import theme from "@/theme";
import { Button, Typography, TypographyProps } from "@mui/material"

export type TextButtonProps = {

} & TypographyProps;

export const TextButton = ({
    ...props
}: TextButtonProps) => {



    return (
        <Typography 
            color={theme.palette.common.black}
            fontSize={FontSize.semium}
            fontWeight={"bold"}
            sx={{ "&:hover": { 
                cursor: "pointer",
                textDecoration: "underline"
            } }}
            onClick={props.onClick}
            {...props}>
            {props.children}
        </Typography>
    )
}