import React, { useState } from 'react';
import {
  Input,
  Form,
  DatePicker,
  Tooltip,
  InputNumber,
  Select,
  Space,
  Upload,
} from '../ant';

const { Option } = Select;
const { TextArea } = Input;

function FormQuestion(props) {
  const [uploadURL, switchUploadType] = useState(true);
  const handleUploadType = () => {
    switchUploadType((prev) => !prev);
  };
  const uploadTypes = (
    <Select
      defaultValue={uploadURL ? 'URL ' : 'FileUpload'}
      className="uploadTypes"
      onChange={handleUploadType}
    >
      <Option value="URL">URL</Option>
      <Option value="FileUpload">File Upload</Option>
    </Select>
  );
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
      {props.question.type === 'linkFile' && !uploadURL && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Upload>
            <Input addonBefore={uploadTypes}></Input>
          </Upload>
        </Form.Item>
      )}
      {props.question.type === 'linkFile' && uploadURL && (
        <Form.Item
          name={props.question.val}
          label={props.question.string}
          rules={[{ required: props.question.required }]}
        >
          <Input addonBefore={uploadTypes}></Input>
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
          <Space direction="vertical" size="middle">
            {props.question.options.map((option) => (
              <Input
                placeholder={option}
                style={{ width: '600px', textAlign: 'left' }}
              />
            ))}
          </Space>
        </Form.Item>
      )}
    </Tooltip>
  );
}

export default FormQuestion;
