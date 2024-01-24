import React from 'react';

const ReceiverMsgItem = ({
  content,
  time,
  isShowImg,
  img,
  isRead,
}: {
  content: string;
  time: string;
  isShowImg: boolean;
  img: string;
  isRead: boolean;
}) => {
  return (
    <div className="w-full pr-[51px] pl-4 flex justify-start items-start gap-x-1">
      <img
        src={img}
        alt=""
        className={`w-[34px] h-[34px] rounded-full ${
          isShowImg ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="bg-grayScale1 text-black px-4 py-3 flex justify-start items-center text-wrap rounded-3xl rounded-tl-none">
        {content}
      </div>
      <div className="shrink-0 h-full flex flex-col gap-y-1 justify-end items-start">
        <div
          className={`text-[10px] ${
            isRead ? 'text-primary' : 'text-grayScale4'
          }`}
        >
          {isRead ? '읽음' : '안읽음'}
        </div>
        <div className="text-[10px] text-grayScale4 bg-transparent">{time}</div>
      </div>
    </div>
  );
};

export default ReceiverMsgItem;
