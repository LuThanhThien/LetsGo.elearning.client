"use client"
import { Colors } from "@/@share/lib/style";
import { Button, ButtonProps, IconButton, IconButtonProps, Input, InputProps, Stack, TextField, TextFieldProps } from "@mui/material";
import { on } from "events";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { MuiColor } from "../display/MuiColor";

export interface SearchFieldProps {
    InputProps?: InputProps,
    searchIcon?: React.ReactNode,
    placeholder?: string,
    variant?: "standard" | "outlined" | "filled",
    fullWidth?: boolean,
    onChange?: (value: string) => void,
    onSearch: (value: string) => void,
    textFieldProps?: TextFieldProps,
    buttonProps?: IconButtonProps,
}

export function SearchField({
    textFieldProps, 
    buttonProps, 
    searchIcon,
    placeholder,
    variant,
    fullWidth,
    InputProps,
    onChange,
    onSearch,
}: SearchFieldProps) {   

    const defaultPlaceHolder = "Tìm kiếm";
    const defaultVariant = "outlined";
    const defaultFullWidth = true;
    const defaultSearchIcon = <Search size={20}/>;
    const [value, setValue] = useState("")

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        onChange ? onChange(e.target.value) : null;
        textFieldProps?.onChange ? textFieldProps.onChange(e) : null;
    }

    function handleOnKeyDown(e: React.KeyboardEvent<HTMLDivElement>, value: string) {
        if (e.key === "Enter") {
            onSearch(value);
        }
    }

    function handleOnClear() {
        setValue("");
        onSearch("");
    }

    return (
        <TextField
            placeholder={placeholder || textFieldProps?.placeholder || defaultPlaceHolder}
            variant={variant || textFieldProps?.variant || defaultVariant}
            fullWidth={fullWidth || textFieldProps?.fullWidth || defaultFullWidth}
            onChange={handleOnChange}
            value={value}
            onKeyDown={(e) => handleOnKeyDown(e, value)}
            InputProps={{
                endAdornment: 
                (<>
                    <IconButton 
                    aria-label="clear"
                    size={"small"}
                    color="error"
                    onClick={() => handleOnClear()}
                    sx={{
                        visibility: value === "" ? "hidden" : "visible",
                    }}
                    >
                        <X size={12}/>
                    </IconButton>
                    <IconButton
                        aria-label="search"
                        {...buttonProps}
                        onClick={() => onSearch(value)}
                    >
                        {searchIcon ? searchIcon : defaultSearchIcon}
                    </IconButton>
                </>),
                ...InputProps,
                ...textFieldProps?.InputProps
            }}
            {...textFieldProps}

        />
    )
}