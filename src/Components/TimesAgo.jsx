import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const TimesAgo = ({ timestamp }) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <span>{timeAgo}</span>
  );
};

export default TimesAgo;
