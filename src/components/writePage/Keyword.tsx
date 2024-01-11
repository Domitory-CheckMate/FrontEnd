import React from 'react';

const Keyword = ({ string }: { string: string }) => {
  return (
    <div className="text-primary rounded-[17px] text-xs bg-[#FFE2D8] px-[16px] py-[6px]">
      {string}
    </div>
  );
};

export default Keyword;
