import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormTextField = ({ name, control, label, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                
                <TextField
                    {...field}
                    value={field.value ?? ''} // Ensure value is controlled
                    onChange={(event) => field.onChange(event.target.value)} // Properly handle onChange
                    label={label}
                    error={!!error?.message}
                    helperText={error?.message}
                    variant="outlined"
                    {...rest}
                />
            )}
        />
    );
};

export default FormTextField;
