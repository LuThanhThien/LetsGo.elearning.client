import { FontSize } from "../../lib/style";
import { Autocomplete, AutocompleteProps, Box, TextField, Typography } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";


export type ControlledDatePicker = {
    control: any;
    defaultValue: any;
    name: string;
    noOptionsText?: string;
} & DatePickerProps<any, any>;

export const ControlledDatePicker = ({ noOptionsText, control, defaultValue, name, views, sx, slotProps, ...props } : ControlledDatePicker) => {
    return (
      <Controller
        render={({ field }) => (
          <DatePicker
          sx={sx ? sx : { width: "100%", }}
          views={views ? views : ["day", "month", "year"]}
          value={field.value ? dayjs(field.value) : null}
          inputRef={field.ref}
          onChange={(date) => {
            field.onChange(date?.toDate());
          }}
          slotProps={slotProps}
          {...props}
          />
        )}
        defaultValue={defaultValue}
        name={name}
        control={control}
      />
    );
  }