import React from 'react';
import { PushpinFilled, PushpinOutlined } from '@ant-design/icons';

export default function Pin({ size, isPinned, onClick }) {
  return (
    <div onClick={() => onClick()}>
      {isPinned ? (
        <PushpinFilled style={{ fontSize: size }} />
      ) : (
        <PushpinOutlined style={{ fontSize: size }} />
      )}
    </div>
  );
}
