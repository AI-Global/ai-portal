import React, { useEffect, useState } from 'react';
import { List, Comment } from '../ant';
import { useAppEnv } from './../env';

import AddReply from './AddReply';

const ReplysList = ({ data, leftMargin }) => {
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

let newMarginLeft = `${leftMargin + 20}px`;
let styles = {
  marginLeft: newMarginLeft,
};

const [comments, setComments] = useState([]);

let objectArray = async() => {
  let array = [];
  for(var i = 0; i < data.length; i++){
    let responseComments = await api.get('/api/comments/' + data[i]);
    let resultJSON = JSON.parse(JSON.stringify(responseComments));
    let responseUser = await api.get('/api/users/' + resultJSON.user);
    resultJSON.username = responseUser.username;
    array.push(resultJSON);
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
          <Comment
            author={item.username}
            avatar={item.avatar}
            content={item.text}
            datetime={getFormattedDate(new Date(item.timestamp))}
          />
          <AddReply type="reply" commentID={item._id}></AddReply>
          <ReplysList data={item.replies} leftMargin={leftMargin + 20}></ReplysList>
        </li>
      )}
    />
  );
};
export default ReplysList;