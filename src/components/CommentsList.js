import React from 'react';
import { List, Comment, Button } from '../ant';
import { useAppEnv } from './../env';
const CommentsList = ({ data }) => {
  let { api, user } = useAppEnv();
  const getFormattedDate = date => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date
      .getDate()
      .toString()
      .padStart(2, '0');

    return month + '/' + day + '/' + year;
  };
  const onDeleteComment = async id => {
    await api.del('/api/comments/' + id + '/' + user._id);
  };
  return (
    <List
      className="comment-list"
      header={`${data.length} replies`}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Comment
            author={item.user.username}
            avatar={item.avatar}
            content={item.text}
            datetime={getFormattedDate(new Date(item.timestamp))}
          >
            {user && (user.role === 'admin' || item.user._id === user._id) ? (
              <Button
                style={{
                  justifyContent: 'flex-end',
                  marginLeft: '90%',
                }}
                onClick={() => onDeleteComment(item._id)}
              >
                Delete
              </Button>
            ) : null}
          </Comment>
        </div>
      )}
    />
  );
};
export default CommentsList;
