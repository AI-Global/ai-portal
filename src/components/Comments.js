import React from 'react';
import AddComment from './AddComment';
import CommentsList from './CommentsList';
const Comments = ({ data }) => {
  return (
    <div>
      <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
        Comments
      </h1>
      <div>
        <CommentsList data={data} />
      </div>
      <AddComment type="comment" />
    </div>
  );
};
export default Comments;
