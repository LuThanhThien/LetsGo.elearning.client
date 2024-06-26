"use client"

import { FontSize } from "../../lib/style";
import { Autocomplete, AutocompleteProps, Box, InputLabel, MenuItem, NativeSelect, NativeSelectProps, Select, SelectProps, Stack, TextField, Typography, TypographyProps } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";


type ControlledSelectProps = {
    options: any[];
    control: any;
    defaultValue: any;
    name: string;
    label?: string;
    noOptionsText?: string;
    inlineLabel?: boolean;
    labelProps?: TypographyProps;    
} & SelectProps<any>;


export const ControlledSelect = ({ options = [], noOptionsText, control, defaultValue, name, fullWidth, value, label, inlineLabel = false, onChange, children, labelProps, ...props } : ControlledSelectProps) => {

    return (
        <Controller
            render={({ field }) => (
                <Stack direction={inlineLabel ? "row" : "column"} alignItems={inlineLabel ? "center" : "flex-start"} spacing={1}>
                    <Typography paddingLeft={1} color="#333333" {...labelProps}>{label}</Typography>
                    <Select
                        labelId={`${name}-select-label`}
                        fullWidth={fullWidth ? fullWidth : true}
                        id={`${name}-select-id`}
                        value={(field) ? field.value : ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        {...props}
                    >
                        {options.map((option: any) => (
                            <MenuItem key={`${name}-${option}`} value={option}>
                                <Typography fontSize={FontSize.semium}>{option}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            )}
            defaultValue={defaultValue}
            name={name}
            control={control}
        />
    );

}


type EnumEntries = {
    label: string;
    value: string;
}

type EntryProps = {
    fieldValue: "value" | "label";
    itemValue: "value" | "label";
}   

type ControlledSelectEnumProps = {
    enumObj: object;
    entryProps?: EntryProps;
    control: any;
    defaultValue: any;
    name: string;
    noOptionsText?: string;
} & SelectProps<any>;



export const ControlledSelectEnum = ({ enumObj, entryProps = { fieldValue: "label", itemValue: "value" }, noOptionsText, control, defaultValue, name, fullWidth, value, onChange, children, ...props } : ControlledSelectEnumProps) => {
    
    const enumOptions = Object.entries(enumObj).map(([key, value]) => ({ label: key, value: value }));
    return (
        <Controller
            render={({ field }) => (
                <Select
                    labelId={`${name}-select-label`}
                    fullWidth={fullWidth ? fullWidth : true}
                    id={`${name}-select-id`}
                    value={
                        enumOptions.find((option: EnumEntries) => option[entryProps.fieldValue] === field.value)?.[entryProps.itemValue] || ""
                    }
                    onChange={(e) => field.onChange(
                        enumOptions.find((option: EnumEntries) => option[entryProps.itemValue] === e.target.value)?.[entryProps.fieldValue]
                    )}
                    {...props}
                >
                    {enumOptions.map((option: EnumEntries) => (
                        <MenuItem key={`${name}-${option[entryProps.itemValue]}`} value={option[entryProps.itemValue]}>
                            <Typography fontSize={FontSize.semium}>{option[entryProps.itemValue]}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            )}
            defaultValue={defaultValue}
            name={name}
            control={control}
        />
    );
}

