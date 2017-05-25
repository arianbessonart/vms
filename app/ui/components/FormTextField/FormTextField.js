import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const FormTextField = ({ input, label, meta: { asyncValidating, touched, error }, ...custom }) => (
  <TextField
    className="form-field"
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

export default FormTextField;
