import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import { Form, Button, Input } from '../ant';

const { TextArea } = Input;

const AddReply = ({ type, commentID, repliedCommentName, currentUser }) => {
  let { api } = useAppEnv();
  let { resId } = useParams();
  const [replyField, setReplyField] = useState("");
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

let fetchName = async () => {
  if(repliedCommentName != currentUser){
    setReplyField(`@${repliedCommentName}`);
  }
};

useEffect(() => {
  fetchName();
}, [repliedCommentName]);

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
