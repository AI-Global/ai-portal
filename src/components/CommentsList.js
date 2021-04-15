import React from 'react';
import { List } from '../ant';
import CommentWithUpvote from './CommentWithUpvote';
import AddReply from './AddReply';
import ReplysList from './ReplysList';
import { useAppEnv } from './../env';

const CommentsList = ({ data, isOnCommentTab, fetchResource }) => {
  let { api, user } = useAppEnv();

  let filteredArray = data.filter(x => x.parent === null);

  if (isOnCommentTab === 1) {
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
            {item.replies?.length > 0 ? (
              <ReplysList
                data={item.replies}
                leftMargin={20}
                parentID={item._id}
              />
            ) : null}
            <AddReply
              commentID={item._id}
              repliedCommentName={item.user.name}
              currentUser={user.name}
              fetchResource={fetchResource}
            ></AddReply>
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
            <CommentWithUpvote item={item} name={item.user.name} />
            <ReplysList
              data={item.replies}
              leftMargin={20}
              parentID={item._id}
            ></ReplysList>
          </li>
        )}
      />
    );
  }
};
export default CommentsList;
