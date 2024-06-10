

import { Box, IconButton, InputAdornment, TextField, TextFieldProps, TextFieldVariants, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export type PasswordTextField = {
    variant?: TextFieldVariants;
    disablePassword?: boolean;
} & Omit<TextFieldProps, 'variant'>;


export const PasswordTextField = React.forwardRef<
    HTMLDivElement,
    PasswordTextField
>(( { disablePassword = false, InputProps, onChange, ...props } , ref) => {
    const [visible, setVisible] = useState(false)

    return (
        <TextField
            type={disablePassword ? "text" : visible ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    !disablePassword && 
                    <InputAdornment position="end">
                        <IconButton onClick={() => setVisible(!visible)}>
                            { visible? <EyeOff size={20}/> : <Eye size={20}/> }
                        </IconButton>
                    </InputAdornment>
                ),
                ... InputProps,
            }}
            onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, '');
                onChange && onChange(e);
            }}
            ref={ref}
            {...props}
        />
    );
});
