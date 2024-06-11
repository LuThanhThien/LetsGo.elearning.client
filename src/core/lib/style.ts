import React from "react";
import { OverridableStringUnion } from "@mui/types";

export const GlobalStyle = {
    width: "1400px"
}

export const Colors = {
    primary: "#fcd46e",
    primaryDarken: "#fdc843",
    primaryLighten: "#fae4adcd",
    secondary: "#fe7210",
    tetiary: "#36659b",
    // tetiary: "#FF7F3E",
    tetiaryDarken: "#2f5683",
    tetiaryLighten: "#4793ea",
    shadow: "#f1f2f47e",
    shadowDarken: "#d1d1d18e",
    // shadowDarken: "#b4b0b0",
    gray: "#787878",
    purple: "#7e57c2",
}


export const FontSize = {
    nano: 8,
    micro: 12,
    small: 14,
    semium: 16,
    medium: 17,
    large: 19,
    oversize: 24,
    super: 27,
    extra: 30,
    huge: 36,
    mega: 45,
}

export const Styles = {
    Card: {
        borderRadius: "10px",
        boxShadow: 'rgba(76, 78, 100, 0.2) 0px 3px 10px 3px',
    },
    Avatar: { 
        width: 46,
        height: 46,
        cursor: "pointer", 
        border: "1px solid rgba(0,0,0,0.3)" 
    },
    InputDisabled: {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#787878",
        },
    },
}


export interface EnumStyle {
    label?: string;
    color?: OverridableStringUnion<
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | any>;
    backgroundColor?: string;
    borderColor?: string;
    icon?: React.ReactElement;
}