import React, { useState } from 'react';
import { PushpinFilled, PushpinOutlined } from '@ant-design/icons';

export default function Pin({ defaultState, size, isPinned, onClick }) {
  let [hovered, setHovered] = useState(false);

  return (
    <div  
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick()}
    >
      {isPinned 
        ? <PushpinFilled style={{fontSize: size}} /> 
        : (hovered 
          ? <PushpinFilled style={{fontSize: size}} />
          : <PushpinOutlined style={{fontSize: size}} />
          )
      }
    </div>
  );
}