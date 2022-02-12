import React from 'react';

const Form = ({ children, ...props }) => {
  return (
    <form noValidate autoComplete="off" {...props}>
      {children}
    </form>
  );
};

export default Form;
