import React, { memo } from 'react';

const Try = memo(({ value, index }) => {
  return (
    <li>
      <b>{value.try}</b> - {value.result}
    </li>
  );
});
Try.displayName = 'Try';
export default Try;
