

// https://stackoverflow.com/questions/71281969/how-to-make-the-default-color-theme-in-mui-transparent

import theme from "@/theme"
import { custom } from "zod"

export type MuiColorProps = {
    noTransparency?: boolean,
    transparency?: string | number
    customColor?: string
}

export const MuiColor = ({
    noTransparency = false,
    transparency = 70,
    customColor = ""
} : MuiColorProps) => {
    if (noTransparency) transparency = 0
    transparency = 1 - Math.max(0, parseFloat(transparency.toString().replace('%', '')) / 100)
    let hexTransparency = Math.round(transparency * 255).toString(16).padStart(2, '0').toUpperCase();
    console.log("hexTransparency: ", hexTransparency)
    return {
        primary: `${theme.palette.primary.main}${hexTransparency}`,
        secondary: `${theme.palette.secondary.main}${hexTransparency}`,
        success: `${theme.palette.success.main}${hexTransparency}`,
        warning: `${theme.palette.warning.main}${hexTransparency}`,
        error: `${theme.palette.error.main}${hexTransparency}`,
        info: `${theme.palette.info.main}${hexTransparency}`,
        white: `${theme.palette.common.white}${hexTransparency}`,
        black: `${theme.palette.common.black}${hexTransparency}`,
        custom: `${customColor === "" ? theme.palette.primary.main : customColor}${hexTransparency}`,
    }
}
