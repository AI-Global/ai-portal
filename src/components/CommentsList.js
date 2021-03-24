import React from 'react';
import { List, Comment } from '../ant';
import { Form, Button, Input } from '../ant';
import AddReply from './AddReply';
import ReplysList from './ReplysList';
import { useAppEnv } from './../env';

const CommentsList = ({ data }) => {
  const getFormattedDate = date => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date
      .getDate()
      .toString()
      .padStart(2, '0');

    return month + '/' + day + '/' + year;
  };
  let { api } = useAppEnv();

  let filteredArray = data.filter( x => 
    x.parent==null
  );

  let result = filteredArray.map(x => x.replies);

  return (
    <List
      className="comment-list"
      header={`${filteredArray.length} comments`}
      itemLayout="horizontal"
      dataSource={filteredArray}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.user.username}
            avatar={item.avatar}
            content={item.text}
            datetime={getFormattedDate(new Date(item.timestamp))}
          />
          <AddReply type="reply" commentID={item._id}></AddReply>
          <ReplysList data={item.replies}></ReplysList>
        </li>
      )}
    />
  );
};
export default CommentsList;
