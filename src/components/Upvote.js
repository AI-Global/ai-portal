import React from 'react';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';

export default function Upvote ({ size, userUpvoted, onClick }) {
  return (
    <div onClick={onClick}>
      {userUpvoted ? (
        <LikeFilled style={{ fontSize: size }} />
      ) : (
        <LikeOutlined style={{ fontSize: size }} />
      )}
    </div>
  );
}
