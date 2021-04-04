import React, { useEffect, useState } from 'react';
import { List, Comment } from '../ant';
import CommentWithUpvote from './CommentWithUpvote';
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
  
  const [userName, setUserName] = useState("");

  let fetchUserName = async (input) => {
    let updatedUserName = "";
    if(input != null){
      updatedUserName = input.name;
    }
    setUserName(updatedUserName);
  };
  
  useEffect(() => {
    fetchUserName(user);
  }, [user]);

  return (
    <List
      className="comment-list"
      itemLayout="horizontal"
      dataSource={filteredArray}
      renderItem={(item) => (
        <li>
          <CommentWithUpvote item={item} name={item.user.name} />
          <AddReply type="reply" commentID={item._id} repliedCommentName={item.user.name} currentUser={userName}></AddReply>
          <ReplysList data={item.replies} leftMargin={20} parentID={item._id} currentUser={userName}></ReplysList>
        </li>
      )}
    />
  );
};
export default CommentsList;
