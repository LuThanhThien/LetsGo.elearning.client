"use client"
import { FontSize } from "@/@share/lib/style";
import { FormHelperText, FormHelperTextProps, styled } from "@mui/material";


export const HelperText = styled(FormHelperText)<FormHelperTextProps>(({ theme }) => {
    return {
        fontSize: FontSize.small + 1,
        color: theme.palette.error.main,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
})  