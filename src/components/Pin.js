import React from 'react';
import { notification } from '../ant';
import { PushpinFilled, PushpinOutlined } from '@ant-design/icons';

export default function Pin({ size, isPinned, onClick, noUser }) {
  console.debug("Inside pin", noUser)
  const sendNotif = () => {
    notification.open({ message: "Make an account to pin resources!" })
  }
  if (!noUser) {
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
  else {
    return (
      <div onClick={() => onClick()}>
        {notification.open({ message: "Make an account to pin resources!" })}
        <PushpinOutlined style={{ fontSize: size }} />
      </div>
    );
  }
}
