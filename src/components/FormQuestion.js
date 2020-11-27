import React from 'react';
import {
  Layout,
  Content,
  Button,
  Input,
  Form,
  Col,
  Typography,
  DatePicker,
  Tooltip,
  Row,
} from '../ant';
import Footer from '../components/Footer';
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import FormHeader from '../components/FormHeader';

function FormQuestion(props) {
  return (
    // <div>
    //   <text>{props.question.val}</text>
    // </div>
    <Form.Item
      name="hello"
      label="hello"
      rules={[{ required: true, message: 'Please add' }]}
    >
      <Input />
    </Form.Item>
  );
}

export default FormQuestion;
