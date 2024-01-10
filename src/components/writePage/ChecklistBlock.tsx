import React from 'react';

const ChecklistBlock = ({ text }: { text: string }) => {
  return (
    <div className="text-[10px] text-center flex py-[7px] px-[14px] text-black rounded-[19px] bg-[#E5E5E5] cursor-pointer">
      {text}
    </div>
  );
};

export default ChecklistBlock;
