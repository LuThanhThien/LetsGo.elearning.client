"use client"
import { FontSize } from "../../lib/style";
import { Autocomplete, AutocompleteProps, Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";


export type ControlledAutocompleteProps = {
    options: any[];
    optionKey?: string;
    control: any;
    defaultValue: any;
    name: string;
    noOptionsText?: string;
    renderInput: AutocompleteProps<any, false, false, false>['renderInput'];
    getOptionLabel?: AutocompleteProps<any, false, false, false>['getOptionLabel'];
    renderOption?: AutocompleteProps<any, false, false, false>['renderOption'];
} & AutocompleteProps<any, false, false, false>;

export const ControlledAutocomplete = ({ options = [], optionKey, renderInput, getOptionLabel, noOptionsText, control, defaultValue, name, renderOption, disablePortal, ...props } : ControlledAutocompleteProps) => {
    return (
      <Controller
        render={({ field }) => (
          <Autocomplete
            disablePortal={disablePortal ? disablePortal : false}
            options={optionKey ? options.map((option) => option[optionKey]) : options}
            id={`${name}-autocomplete`}
            value={options.find((option) => option === field.value) || null}
            onChange={(e, value) => field.onChange(value || "")}
            onInputChange={(e, value) => field.onChange(value || "")}
            noOptionsText={
                noOptionsText ? noOptionsText :
                <Typography fontSize={FontSize.semium}>
                  Không có kết quả
                </Typography>
              }
            getOptionLabel={getOptionLabel ? getOptionLabel : (option) => option}
            renderOption={renderOption ? renderOption : (props, option) => (
                <Box component="li" {...props} key={`${name}-${option}`}>
                    <Typography fontSize={FontSize.semium}>{option}</Typography>
                </Box>
            )}
            renderInput={renderInput}
            {...props}
          />
        )}
        defaultValue={defaultValue}
        name={name}
        control={control}
      />
    );
  }
