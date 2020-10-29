import React from 'react';
import {
  Form,
  Tooltip,
  Input
} from '../ant';

function FormField(props) {
  return (
    <Tooltip title={props.text}>
    <Form.Item  
      name=  {props.name} 
      label= {props.label}
      rules={[{ required: true, message: 'Please add the '+ props.label}]}
    >
      <Input/>
    </Form.Item>
    </Tooltip>
  );
}


export default FormField;