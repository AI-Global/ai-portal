import React from 'react';
import {
  Form,
} from '../ant';
import {Select} from 'antd'
const {Option} = Select;

function ResourceField(props) {
  let children = []
  for (let i = 0; i < props.options.length; i++) {
    children.push(<Option key={props.options[i]} >{props.options[i]}</Option>);
  }
  return (
    <Form.Item  
      label= {props.field}
      name=  {props.field} 
    >
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
      >
      {children}
      </Select>
    </Form.Item>
  );
}

export default ResourceField;