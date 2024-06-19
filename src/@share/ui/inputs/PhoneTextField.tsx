"use client"

import { Box, TextField, TextFieldProps, TextFieldVariants, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { PreventTooltip } from "../display/CustomTooltips";
import { doFormatPhoneNumber } from "../../lib/utils";

export type PhoneTextFieldProps = {
    variant?: TextFieldVariants;
    autoFormat?: boolean;
    formatOnFocus?: boolean;
    includeList?: string[];
} & Omit<TextFieldProps, 'variant'>;


export const PhoneTextField = React.forwardRef<
    HTMLDivElement,
    PhoneTextFieldProps
>(( { variant, autoFormat = true, formatOnFocus = true, includeList = [], ...props } , ref) => {
    const { onChange, onBlur, onFocus, ...other} = props;
    const [ openTooltip, setOpenTooltip ] = useState<boolean>(false);
    const acceptList = [ " " , ...includeList ]

    const tooltipTitle = includeList.length > 0 ? `Chỉ chấp nhận số, khoảng trắng và${includeList.length > 1 ? ' các ' : ' '}ký tự: \n ${includeList.join(", ")}` : "Chỉ chấp nhận số và khoảng trắng";

    const handleCloseTooltip = () => setOpenTooltip(false);
    const handleOpenTooltip = () => setOpenTooltip(true);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let formattedValue = "";
        const {value} = e.target;
        for (let i = 0; i < value.length; i++) {
            if (acceptList.includes(value[i]) || !isNaN(parseInt(value[i]))) {
                formattedValue += value[i];
                handleCloseTooltip();
            } else {
                handleOpenTooltip();
            }
        }
        if (autoFormat && formatOnFocus) { formattedValue = doFormatPhoneNumber(formattedValue, 3) };
        e.target.value = formattedValue;
        if (onChange) onChange(e);
        console.log("Final value: " + formattedValue)
    }

    return (
    <>
        <PreventTooltip title={tooltipTitle} arrow onClose={handleCloseTooltip} open={openTooltip} placement="top-start">
        <Box>
            <TextField
                ref={ref}
                variant={variant}
                onChange={handleOnChange}
                {...other}
            />
        </Box>
        </PreventTooltip>
    </>
    );
});
