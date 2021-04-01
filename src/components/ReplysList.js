import React, { useEffect, useState } from 'react';
import { List, Comment } from '../ant';
import { useAppEnv } from './../env';

import CommentWithUpvote from './CommentWithUpvote';
import AddReply from './AddReply';

const ReplysList = ({ data, leftMargin, parentID }) => {
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

let newMarginLeft = `${leftMargin}px`;
let styles = {
  marginLeft: newMarginLeft,
};

const [comments, setComments] = useState([]);

let objectArray = async() => {
  let array = [];
  for(var i = 0; i < data.length; i++){
    let responseComments = await api.get('/api/comments/' + data[i]);
    let resultJSON = JSON.parse(JSON.stringify(responseComments));
    if(resultJSON != null){
      let responseUser = await api.get('/api/users/' + resultJSON.user);
      if(responseUser != null){
        resultJSON.username = responseUser.username;
        resultJSON.name = responseUser.name;
        array.push(resultJSON);
      }
    }
  }
  return array;
}

let fetchComments = async () => {
  let userObjectResult = await objectArray();
  setComments(userObjectResult);
};

useEffect(() => {
  fetchComments();
}, [data]);

  return (
    <List
      className="reply-list"
      itemLayout="horizontal"
      locale={{ emptyText: " ", }}
      dataSource={comments}
      renderItem={item => (
        <li style={ styles }>
          <CommentWithUpvote item={item} />
          <AddReply type="reply" commentID={parentID} repliedCommentName={item.name} currentUser={user.name}></AddReply>
        </li>
      )}
    />
  );
};
export default ReplysList;