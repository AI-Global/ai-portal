import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import { Form, Button, Input, notification } from '../ant';

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
    setReplyField('');
    let response = await api.post('/api/comments/add-reply', {
      parentID: commentID,
      replyText: replyField,
      resId: resId,
    });
    if(response.status === 200){
      notification.open({
        message: 'Reply Successfully Submitted!',
      });
    }
    else{
      notification.open({
        message: 'Error adding reply',
      });
    }
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
