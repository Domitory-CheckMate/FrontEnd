import React from 'react';

const ChecklistBlock = ({
  text1,
  text2,
  text3,
}: {
  text1?: string;
  text2: string;
  text3?: string;
}) => {
  return (
    <div className="flex text-lg font-normal text-center items-center text-black px-4 py-1.5">
      <div>{text1}</div>
      <div className="ml-[13px] mr-[4px] text-base text-center flex py-2 px-4 text-white rounded-[19px] bg-black cursor-pointer">
        {text2}
      </div>
      <div>{text3}</div>
    </div>
  );
};

export default ChecklistBlock;
