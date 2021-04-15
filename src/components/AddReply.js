import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import { Form, Button, Input, notification, Collapse } from '../ant';
import { CommentOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Panel } = Collapse;

const AddReply = ({
  commentID,
  repliedCommentName,
  currentUser,
  fetchResource,
}) => {
  let { api } = useAppEnv();
  let { resId } = useParams();
  const [replyField, setReplyField] = useState('');
  const [open, setOpen] = useState(false);

  const handleOnChange = e => {
    setReplyField(e.target.value);
  };
  const handleOnSubmit = async () => {
    setReplyField('');
    setOpen(false);
    let response = await api.post('/api/comments/add-reply', {
      parentID: commentID,
      replyText: replyField,
      resId: resId,
    });
    if (response.status === 200) {
      notification.open({
        message: 'Reply Successfully Submitted!',
      });
      fetchResource();
    } else {
      notification.open({
        message: 'Error adding reply',
      });
    }
  };

  let replyStyle = {
    backgroundColor: 'transparent',
    marginTop: 0,
    border: 'none',
  };

  let fetchName = async () => {
    if (repliedCommentName !== currentUser) {
      setReplyField(`@${repliedCommentName}`);
    }
  };

  useEffect(() => {
    fetchName();
  }, [repliedCommentName]);

  return (
    <>
      <Collapse
        activeKey={open ? [1] : []}
        onChange={() => setOpen(prev => !prev)}
        style={replyStyle}
        expandIcon={() => <CommentOutlined />}
        ghost
      >
        <Panel
          header="Reply"
          style={replyStyle}
          key={1}
          onChange={() => setOpen(prev => !prev)}
        >
          <Form.Item>
            <TextArea rows={4} onChange={handleOnChange} value={replyField} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" onClick={handleOnSubmit} type="primary">
              Add Reply
            </Button>
          </Form.Item>
        </Panel>
      </Collapse>
    </>
  );
};

export default AddReply;
