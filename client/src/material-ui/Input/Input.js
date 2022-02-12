import React, { forwardRef } from 'react';
import { TextField } from '@material-ui/core';

const Input = forwardRef((props, ref) => {
  return (
    <>
      <TextField
        className="form-control"
        inputRef={ref}
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        {...props}
      >
        {props.children}
      </TextField>
    </>
  );
});
export default Input;
