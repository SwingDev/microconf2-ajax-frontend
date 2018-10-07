import React from 'react';

export const RequestTimeLabel = (props) => (
  <span>
    {`${props.secs.toFixed(1)} s`}
  </span>
);
