
    "use client";
    import { FontSize } from "../../lib/style";
    import { MenuItem, Select, SelectProps, Stack, Typography, TypographyProps } from "@mui/material";


    type DefaultSelectProps = {
        options: any[];
        defaultValue: any;
        name: string;
        label?: string;
        inlineLabel?: boolean;
        labelProps?: TypographyProps;    
    } & SelectProps<any>;


    export const DefaultSelect = ({ 
        options = [], 
        defaultValue, 
        name, 
        fullWidth, 
        label, 
        inlineLabel = false, 
        labelProps, 
        ...props 
    } : DefaultSelectProps) => {

        return (
            <Stack direction={inlineLabel ? "row" : "column"} alignItems={inlineLabel ? "center" : "flex-start"} spacing={1}>
                <Typography paddingLeft={1} color="#333333" {...labelProps}>{label}</Typography>
                <Select
                    defaultValue={options[0]}
                    labelId={`${name}-select-label`}
                    fullWidth={fullWidth ? fullWidth : true}
                    id={`${name}-select-id`}
                    {...props}
                >
                    {options.map((option: any) => (
                        <MenuItem key={`${name}-${option}`} value={option}>
                            <Typography fontSize={FontSize.semium}>{option}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </Stack>
        );

    }

