import React, { useEffect, useState } from 'react';
import { List, Comment, notification } from '../ant';
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

  let objectArray = async () => {
    let array = [];
    for (var i = 0; i < data.length; i++) {
      let responseComments = await api.get('/api/comments/' + data[i]);
      let resultJSON = JSON.parse(JSON.stringify(responseComments));
      if (resultJSON != null) {
        if(resultJSON.status === 200){
          let responseUser = await api.get('/api/users/' + resultJSON.user);
          if (responseUser != null) {
            if(responseUser.status === 200){
              resultJSON.username = responseUser.username;
              resultJSON.name = responseUser.name;
              array.push(resultJSON);  
            }
            else{
              notification.open({
                message: 'Failed to fetch full list of replies',
              });
            }
          }
        }
        else{
          notification.open({
            message: 'Failed to fetch full list of replies',
          });
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

  if (user != null) {
    return (
      <List
        className="reply-list"
        itemLayout="horizontal"
        locale={{ emptyText: " ", }}
        dataSource={comments}
        renderItem={item => (
          <li style={styles}>
            <CommentWithUpvote item={item} name={item.name} />
            <AddReply type="reply" commentID={parentID} repliedCommentName={item.name} currentUser={user.name}></AddReply>
          </li>
        )}
      />
    );
  }
  else {
    return (
      <List
        className="reply-list"
        itemLayout="horizontal"
        locale={{ emptyText: " ", }}
        dataSource={comments}
        renderItem={item => (
          <li style={styles}>
            <CommentWithUpvote item={item} name={item.name} />
          </li>
        )}
      />
    );
  }
};
export default ReplysList;