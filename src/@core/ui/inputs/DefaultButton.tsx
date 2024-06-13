"use client"
import { Colors, FontSize } from "../../lib/style";
import { Button, ButtonProps, CircularProgress, Typography, TypographyProps } from "@mui/material"
import React from "react";

export interface DefaultButtonProps extends ButtonProps {
    processing?: boolean,
    processingText?: string,
    processIcon?: React.ReactNode,
    noPadding?: boolean,
    maxWidth?: string | number,
    processVariant?: "contained" | "outlined" | "text",
    processColor?: "primary" | "secondary" | "error" | "success" | "warning" | "info",
    typographyProps?: TypographyProps
}


export const DefaultButton: React.FC<DefaultButtonProps> = ( {
    disabled, children, fullWidth, maxWidth, variant, color, startIcon, endIcon, className, sx, typographyProps, noPadding = false, processing = false, processingText, processIcon, processVariant, processColor, ...others} )  => {
        
    const isText = variant === "text";
    const isOutlined = variant === "outlined";
    const isInherit = color === "inherit";

    // Default button styles
    const disabledProp = processing ? true : disabled;
    const fullWidthProp = fullWidth || true;
    const startIconProp = processing ? (processIcon || <CircularProgress size={20} color="inherit"/>) : startIcon;
    const endIconProp = endIcon;
    const variantProp = (processing && processVariant) ? processVariant : variant || "contained";
    const colorProp = (processing && processColor) ? processColor : color || "secondary";

    const defaultMaxWidth = isText ? "fit-content" : maxWidth || null;
    const defaultBorderColor = isInherit ? "#aaa8a8" : null
    const defaultBorderRadius = "15px";
    const defaultBorderThickness = isOutlined ? 1 : 0;
    const defaultStartIcon = (isText || noPadding) ? {} : { paddingTop: "10px", paddingBottom: "10px"}
    const defaultEndIcon = (isText || noPadding) ? {} : { paddingTop: "10px", paddingBottom: "10px"}
    const defaultHoverBackgroundColor = isText ? "transparent" : null;
    const defaultHoverColor = isText ? Colors.secondary : null

    // Typography styles
    const typographyChildPadding = {
        left: noPadding ? 0 : (isText ? "0px" : startIconProp ? "2px" : "2px"),
        right: noPadding ? 0 : (isText ? "0px" : endIconProp ? "2px" : "2px"),
        top: noPadding ? 0 : "2px",
        bottom: noPadding ? 0 : "2px",
        fontSize: FontSize.semium
    }

    return (
        <Button 
            disabled={disabledProp}
            fullWidth={fullWidthProp}
            startIcon={startIconProp}
            endIcon={endIconProp}
            variant={variantProp}
            color={colorProp}
            className={className}
            sx={{ 
                maxWidth: defaultMaxWidth,
                borderColor: defaultBorderColor, 
                borderRadius: defaultBorderRadius,
                border: defaultBorderThickness,
                '& .MuiButton-startIcon' : defaultStartIcon,
                '& .MuiButton-endIcon' : defaultEndIcon,
                '&:hover': {
                    backgroundColor: defaultHoverBackgroundColor,
                    color: defaultHoverColor
                },
                ...sx
            }}
            {...others}
        >
            <Typography 
                variant={typographyProps?.variant || "button"} 
                paddingLeft={typographyProps?.paddingLeft || typographyChildPadding.left} 
                paddingRight={typographyProps?.paddingRight || typographyChildPadding.right} 
                paddingTop={typographyProps?.paddingTop || typographyChildPadding.top} 
                paddingBottom={typographyProps?.paddingBottom || typographyChildPadding.bottom} 
                fontSize={typographyProps?.fontSize || typographyChildPadding.fontSize}
                fontWeight={typographyProps?.fontWeight || "bold"}
                {...typographyProps}
                >
                { processing  ?  (processingText || "Đang xử lý") : children }
            </Typography>
        </Button>
    )
}
