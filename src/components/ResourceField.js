import React from 'react';
import {
  Form,
} from '../ant';
import {Select} from 'antd'
import { OmitProps } from 'antd/lib/transfer/ListBody';
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
      style={{justifyContent:"center", width:'900px'}}>
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