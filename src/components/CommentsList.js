import React from 'react';
import { List } from '../ant';
import CommentWithUpvote from './CommentWithUpvote';

const CommentsList = ({ data }) => {
  return (
    <List
      className="comment-list"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <li>
          <CommentWithUpvote item={item} />
        </li>
      )}
    />
  );
};
export default CommentsList;
