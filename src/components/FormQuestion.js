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
  InputNumber,
  Row,
  Select,
  Upload,
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
          initialValue={props.question.example_ans}
        >
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            defaultValue={props.question.example_ans}
          >
            {props.question.options.map((option) => (
              <Option value={option}>{option} </Option>
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
          initialValue={props.question.example_ans}
        >
          <Select
            showSearch
            mode={props.question.type}
            allowClear
            style={{ width: '100%' }}
            defaultValue={props.question.example_ans}
          >
            {props.question.options.map((option) => (
              <Option value={option}>{option} </Option>
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
      {props.question.type === 'linkFile' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          {/* <Input /> */}
          <Upload>
            <Button> click</Button>
          </Upload>
        </Form.Item>
      )}
      {props.question.type === 'number' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <InputNumber />
        </Form.Item>
      )}
      {props.question.type === 'multiple-type' && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          {props.question.options.map((option) => (
            <Input placeholder={option} />
          ))}
        </Form.Item>
      )}
    </Tooltip>
  );
}

export default FormQuestion;
