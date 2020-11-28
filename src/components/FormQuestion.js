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
  Select,
} from '../ant';
import Footer from '../components/Footer';
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import FormHeader from '../components/FormHeader';
const { Option } = Select;
const { TextArea } = Input;
function FormQuestion(props) {
  return (
    <Tooltip title={props.question.tip}>
      {props.question.type === 'type' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Input placeholder={props.question.example_ans} />
        </Form.Item>
      )}
      {props.question.type === 'select' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            defaultValue={props.question.example_ans}
          >
            {props.question.options.map((option) => (
              <Option value={option.toLowerCase()}>{option} </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {(props.question.type === 'multiple' ||
        props.question.type === 'tags') && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Select
            showSearch
            mode={props.question.type}
            allowClear
            style={{ width: '100%' }}
            defaultValue={props.question.example_ans}
          >
            {props.question.options.map((option) => (
              <Option value={option.toLowerCase()}>{option} </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {props.question.type === 'text-area' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <TextArea rows={4} placeholder={props.question.example_ans} />
        </Form.Item>
      )}
      {props.question.type === 'date' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <DatePicker />
        </Form.Item>
      )}
    </Tooltip>
  );
}

export default FormQuestion;
