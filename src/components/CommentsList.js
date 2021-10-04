import React from 'react';
import { List, Comment } from '../ant';
import CommentWithUpvote from './CommentWithUpvote';
import AddReply from './AddReply';
import ReplysList from './ReplysList';
import { useAppEnv } from './../env';

const CommentsList = ({ data, isOnCommentTab, fetchResource }) => {
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

  let filteredArray = data.filter(x => x.parent == null);

  filteredArray = filteredArray.reverse();

  if (isOnCommentTab == 1) {
    filteredArray = filteredArray.slice(0, 2);
  }

  if (user != null) {
    return (
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={filteredArray}
        renderItem={item => (
          <li>
            <CommentWithUpvote
              item={item}
              name={item.user.name}
              fetchResource={fetchResource}
            />
            <AddReply
              type="reply"
              commentID={item._id}
              repliedCommentName={item.user.name}
              currentUser={user.name}
              fetchResource={fetchResource}
            />
            <ReplysList
              data={item.replies}
              leftMargin={20}
              parentID={item._id}
              fetchResource={fetchResource}
            />
          </li>
        )}
      />
    );
  } else {
    return (
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={filteredArray}
        renderItem={item => (
          <li>
            <CommentWithUpvote
              item={item}
              name={item.user.name}
              fetchResource={fetchResource}
            />
            <ReplysList
              data={item.replies}
              leftMargin={20}
              parentID={item._id}
              fetchResource={fetchResource}
            />
          </li>
        )}
      />
    );
  }
};
export default CommentsList;
