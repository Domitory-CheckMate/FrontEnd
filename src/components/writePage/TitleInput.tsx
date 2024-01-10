import React from 'react';

const TitleInput = ({ title }: { title: string }) => {
  return (
    <div className="flex-col mt-[25px]]">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">{title}</div>
      </div>
      <div className="flex w-full mt-[13px] text-sm font-normal px-[14px] py-[12px] border-[#999] border-[1px] rounded-[10px]">
        <input
          className="w-full h-[17px] text-black  placeholder-[#999] focus:outline-none"
          placeholder="모집글의 제목을 입력하세요"
        />
      </div>
    </div>
  );
};

export default TitleInput;
