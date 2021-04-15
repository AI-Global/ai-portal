import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppEnv } from './../env';
import {
  List,
  Comment,
  Statistic,
  Row,
  Col,
  notification,
  Button,
} from '../ant';
import Upvote from './Upvote';

const getFormattedDate = date => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date
    .getDate()
    .toString()
    .padStart(2, '0');

  return month + '/' + day + '/' + year;
};

export default function CommentWithUpvote({ item, name, fetchResource }) {
  let { api, user } = useAppEnv();
  let [upvoted, setUpvoted] = useState(false);
  let [upvotes, setUpvotes] = useState(item.upvotes);
  const onDeleteComment = async id => {
    await api.del('/api/comments/' + id + '/' + user._id);
    await fetchResource();
  };
  useLayoutEffect(() => {
    setUpvoted(user?.upvotedComments.includes(item._id));
  }, [api, user]);

  const toggleUpvote = async () => {
    let res = await api.post('/api/users/' + user?._id + '/upvote-comment', {
      commentId: item._id,
    });

    if (res.status === 200) {
      if (upvoted) {
        setUpvotes(prevUpvotes => prevUpvotes - 1);
      } else {
        setUpvotes(prevUpvotes => prevUpvotes + 1);
      }

      setUpvoted(prevUpvoted => !prevUpvoted);
    }
  };

  return (
    <div>
      <Row gutter={[24, 4]}>
        <Col align="center" style={{ padding: '16px 0 0 0' }}>
          <Upvote size={18} userUpvoted={upvoted} onClick={toggleUpvote} />
          <Statistic value={upvotes} valueStyle={{ fontSize: 18 }} />
        </Col>
        <Col justify="center">
          <Comment
            author={name}
            avatar={item.avatar}
            content={item.text}
            datetime={getFormattedDate(new Date(item.timestamp))}
          ></Comment>
        </Col>
        <Col style={{ padding: '16px 0 0 0' }}>
          {user && (user.role === 'admin' || item.user._id === user._id) ? (
            <Button onClick={() => onDeleteComment(item._id)}>Delete</Button>
          ) : null}
        </Col>
      </Row>
    </div>
  );
}
