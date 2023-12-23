import React from 'react';

const Divider = ({ color }: { color?: boolean }) => {
  return (
    <div
      className={`w-full h-px ${color ? 'bg-[#EDEDED]' : 'bg-invalidGray'}`}
    />
  );
};

export default Divider;
