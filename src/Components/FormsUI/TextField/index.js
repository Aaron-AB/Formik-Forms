import React from 'react'
import { TextField } from '@material-ui/core';
import { useField  } from 'formik';

const TextfieldWrapper = ({
    name,
    ...otherProps
}) => {

    const [field, mata] = useField(name);

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    //Passes errors to the textfield
    if (mata && mata.touched && mata.error) {
        //Textfield turns red
        configTextfield.error = true;
        //Custom error message
        configTextfield.helperText = mata.error;
    }

    return (
        <TextField {...configTextfield} />
    );
};

export default TextfieldWrapper;
