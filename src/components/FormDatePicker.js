import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormDatePicker = ({ name, control, label, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    {...rest}
                    {...field}
                    inputFormat="dd/MM/yyyy"
                    label={label}
                    renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!error?.message}
                                helperText={error?.message}
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                    )}
                />
            )}
        />
    );
};

export default FormDatePicker;
