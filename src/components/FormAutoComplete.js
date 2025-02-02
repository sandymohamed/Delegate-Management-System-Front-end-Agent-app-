import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormAutoComplete = ({ name, control, label, options, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    value={field.value || null} // Ensure value is controlled
                    options={options}
                    getOptionLabel={(option) => (option?.name ? option.name : '')}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    onChange={(_, value) => field.onChange(value)} // Properly handle onChange
                    renderInput={(params) => (
                        <div dir="rtl">
                            <TextField
                                {...params}
                                label={label}
                                error={!!error?.message}
                                helperText={error?.message}
                            />
                        </div>
                    )}
                    {...rest}
                />
            )}
        />
    );
};

export default FormAutoComplete;
