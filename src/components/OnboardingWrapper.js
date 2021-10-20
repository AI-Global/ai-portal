/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Popover } from '../ant';
import { useAppEnv } from '../env';

export default function OnboardingWrapper({
  name,
  content,
  placement = 'bottom',
  baseContent,
  width = '200px',
}) {
  let [visible, setVisible] = useState(false);
  let [onTop, setOnTop] = useState(false);
  let { api, user } = useAppEnv();

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      const { data = true } = await api.get('/api/onboarding', {
        userId: user._id,
        tooltipName: name,
      });

      setVisible(!data);
    };
    fetchOnboardingStatus();
  }, [api, name, user]);

  const markDone = async () => {
    setVisible(false);
    api.post('/api/onboarding', {
      userId: user._id,
      tooltipName: name,
    });
  };

  const markAllDone = async () => {
    setVisible(false);
    api.post('/api/onboarding', {
      userId: user._id,
    });
  };

  const handleHover = () => {
    setOnTop((prev) => !prev);
  };

  return (
    <Popover
      content={
        <div
          style={{ width, textAlign: 'center' }}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <p>
            {content} <br /> <br />
            <a onClick={markDone}>Close</a> <br />
            <a onClick={markAllDone}>Skip Onboarding</a>
          </p>
        </div>
      }
      visible={visible}
      placement={placement}
      zIndex={onTop ? 999999 : 100}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      {baseContent}
    </Popover>
  );
}
