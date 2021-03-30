import React from 'react';
import { List, Comment } from '../ant';
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

  let { api, user } = useAppEnv();

  let filteredArray = data.filter( x => 
    x.parent==null
  );
  
  return (
    <List
      className="comment-list"
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
          <AddReply type="reply" commentID={item._id} repliedCommentName={item.user.name} currentUser={user.name}></AddReply>
          <ReplysList data={item.replies} leftMargin={20} parentID={item._id}></ReplysList>
        </li>
      )}
    />
  );
};
export default CommentsList;
