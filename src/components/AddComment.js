import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import { Form, Button, Input } from '../ant';
const { TextArea } = Input;

const AddComment = ({ type, fetchResource }) => {
  let { api } = useAppEnv();
  let { resId } = useParams();
  const [commentField, setCommentField] = useState('');
  const handleOnChange = e => {
    setCommentField(e.target.value);
  };
  const handleOnSubmit = async () => {
    if (type === 'comment') {
      await api.post('/api/comments', {
        resourceId: resId,
        text: commentField,
        timestamp: Date.now(),
      });
    }
    fetchResource();
  };
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={handleOnChange} value={commentField} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={handleOnSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
};

export default AddComment;
