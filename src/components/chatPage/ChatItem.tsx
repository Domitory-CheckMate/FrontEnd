import React from 'react';

import { ReactComponent as Img0 } from '../../assets/icon/icon_chat_profile_0.svg';

const ChatItem = ({
  img,
  name,
  content,
  period,
  info,
  newChat,
}: {
  img: string;
  name: string;
  content: string;
  period: string;
  info: string;
  newChat: number;
}) => {
  console.log(img);
  return (
    <div className="flex w-full justify-center items-center py-[14px] border-b-[1px] border-[#F7F7F7]">
      <div className="mr-[16px] w-[19px] h-[19px] rounded-full border-[1px] border-[#E5E5E5]"></div>
      <div className="w-[52px] h-[52px] mr-[10px]">
        <Img0 />
      </div>
      <div className="flex grow flex-col gap-[8px]">
        <div className="flex items-center">
          <div className="text-black mr-[7px] text-[12px] font-semibold ">
            {' '}
            {name}{' '}
          </div>
          <div className="mr-[8px] text-[10px] text-[#999]"> {info} </div>
          <div className="rounded-[18.5px] flex justify-center items-center bg-[#FF9D7E] text-white px-[9px] py-[4px] text-[10px]">
            {' '}
            {period}{' '}
          </div>
        </div>
        <div className="text-[12px] w-full text-[#666] font-medium">
          {content}
        </div>
      </div>
      {newChat > 0 && (
        <div className="w-[18px] h-[18px] rounded-full bg-primary text-white text-[8px] font-normal flex items-center justify-center">
          {newChat.toString()}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
