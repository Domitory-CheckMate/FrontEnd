import React from 'react';

const SenderMsgItem = ({
  content,
  time,
  isRead,
}: {
  content: string;
  time: string;
  isRead: boolean;
}) => {
  return (
    <div className="w-full pl-[51px] pr-4 flex justify-end items-end gap-x-1">
      <div className="shrink-0 h-full flex flex-col gap-y-1 justify-end items-end">
        <div
          className={`text-[10px] ${
            isRead ? 'text-primary' : 'text-grayScale4'
          }`}
        >
          {isRead ? '읽음' : '안읽음'}
        </div>
        <div className="text-[10px] text-grayScale4 bg-transparent">{time}</div>
      </div>
      <div className="bg-primary text-white px-4 py-3 flex justify-start items-center text-wrap rounded-3xl rounded-tr-none">
        {content}
      </div>
    </div>
  );
};

export default SenderMsgItem;
