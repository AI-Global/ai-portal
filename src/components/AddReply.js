import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import { Form, Button, Input } from '../ant';
import mongoose from 'mongoose';

const { TextArea } = Input;

const AddReply = ({ type, commentID }) => {
  let { api } = useAppEnv();
  let { resId } = useParams();
  const [replyField, setReplyField] = useState('');
  const handleOnChange = e => {
    setReplyField(e.target.value);
  };
const handleOnSubmit = async () => {
  if (type === 'reply') {
    await api.post('/api/comments/add-reply', {
      parentID: commentID,
      replyText: replyField,
      resId: resId,
    });
  }
};
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={handleOnChange} value={replyField} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={handleOnSubmit} type="primary">
          Add Reply
        </Button>
      </Form.Item>
    </>
  );
};

export default AddReply;
