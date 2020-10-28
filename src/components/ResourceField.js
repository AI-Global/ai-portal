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
    <Form.Item  
      label= {props.field}
      name=  {props.field} 
      rules={[{ required: true, message: 'Please add the '+ props.field}]}
    >
      <Tooltip placement="rightBottom" title={props.text}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
        >
        {children}
        </Select>
      </Tooltip>
    </Form.Item>
  );
}

export default ResourceField;