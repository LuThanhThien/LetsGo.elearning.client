import { Colors, FontSize } from "@/lib/styles";
import { Button, ButtonProps, CircularProgress, Typography, TypographyProps } from "@mui/material"
import React, { useEffect } from "react";

interface DefaultButtonProps extends ButtonProps {
    processing?: boolean,
    processingText?: string,
    processIcon?: React.ReactNode,
    noPadding?: boolean,
    processVariant?: "contained" | "outlined" | "text",
    processColor?: "primary" | "secondary" | "error" | "success" | "warning" | "info",
    typographyProps?: TypographyProps
}


const DefaultButton: React.FC<DefaultButtonProps> = ( {
    disabled, children, fullWidth, variant, color, startIcon, endIcon, className, sx, typographyProps, noPadding = false, processing = false, processingText, processIcon, processVariant, processColor, ...others} )  => {
        
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

    const defaultMaxWidth = isText ? "fit-content" : null;
    const defaultBorderColor = isInherit ? "#aaa8a8" : null
    const defaultBorderRadius = 1.5;
    const defaultBorderThickness = isOutlined ? 1.5 : 0;
    const defaultStartIcon = (isText || noPadding) ? {} : { paddingLeft: 1, paddingTop: 1.5, paddingBottom: 1.5}
    const defaultEndIcon = (isText || noPadding) ? {} : { paddingRight: 1, paddingTop: 1.5, paddingBottom: 1.5}
    const defaultHoverBackgroundColor = isText ? "transparent" : null;
    const defaultHoverColor = isText ? Colors.secondary : null

    // Typography styles
    const typographyChildPadding = {
        left: noPadding ? 0 : (isText ? "0px" : startIconProp ? "2px" : "5px"),
        right: noPadding ? 0 : (isText ? "0px" : endIconProp ? "2px" : "5px"),
        top: noPadding ? 0 : "5px",
        bottom: noPadding ? 0 : "5px"
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
                fontSize={typographyProps?.fontSize || FontSize.medium}
                fontWeight={typographyProps?.fontWeight || "bold"}
                {...typographyProps}
                >
                { processing  ?  (processingText || "Đang xử lý") : children }
            </Typography>
        </Button>
    )
}

export default DefaultButton