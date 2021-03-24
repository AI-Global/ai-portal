import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppEnv } from './../env';
import { List, Comment, Statistic, Row, Col, notification } from '../ant';
import Upvote from './Upvote'

const getFormattedDate = date => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date
    .getDate()
    .toString()
    .padStart(2, '0');

  return month + '/' + day + '/' + year;
};

export default function CommentWithUpvote({ item }) {
  let { api, user } = useAppEnv();
  let [upvoted, setUpvoted] = useState(false);
  let [upvotes, setUpvotes] = useState(item.upvotes);

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

    
  }

  return (
    <div>
      <Row gutter={[24, 4]}>
        <Col align="center" style={{padding: "16px 0 0 0"}}>
          <Upvote size={18} userUpvoted={upvoted} onClick={toggleUpvote}/>
          <Statistic value = {upvotes} valueStyle={{ fontSize: 18 }}/>
        </Col>
        <Col justify="center">
          <Comment
            author={item.user.username}
            avatar={item.avatar}
            content={item.text}
            datetime={getFormattedDate(new Date(item.timestamp))}
          />
        </Col>
      </Row>
    </div>
  );
}