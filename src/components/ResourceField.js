import React from 'react';
import {
  Form,
  Select,
  Tooltip
} from '../ant';
const {Option} = Select;

function ResourceField(props) {
  let children = []
  for (let i = 0; i < props.options.length; i++) {
    children.push(<Option key={props.options[i]} >{props.options[i]}</Option>);
  }
  return (
    <Tooltip title={props.text}>
      <Form.Item  
        label= {props.label}
        name=  {props.name} 
        rules={[{ required: true, message: 'Please add the '+ props.label}]}
      >
          <Select
            mode={props.mode}
            allowClear
            style={{ width: '100%' }}
          >
          {children}
          </Select>
      </Form.Item>
    </Tooltip>
  );
}

export default ResourceField;