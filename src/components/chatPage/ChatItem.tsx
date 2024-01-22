import React from 'react';

const ChatItem = ({
  img,
  name,
  department,
  gender,
  endDate,
  unRead,
  lastMessage,
  onClickHandler,
}: {
  img: string;
  name: string;
  department: string;
  gender: 'MAN' | 'WOMAN';
  endDate: string | null;
  unRead: number;
  lastMessage: string;
  onClickHandler: () => void;
}) => {
  const convertDate = (date: string) => {
    const today = new Date();
    const end = new Date(date);
    const timeDiff = end.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `D-${dayDiff}`;
  };
  return (
    <div
      className="shrink-0 flex w-full justify-center items-center gap-x-2.5 py-[15px] border-b border-solid border-grayScale1 last:border-b-0 cursor-pointer"
      onClick={onClickHandler}
    >
      <img
        src={img}
        alt="profile"
        className="w-[52px] h-[52px] rounded-full object-cover"
      />
      <div className="grow flex flex-col gap-y-2.5 items-start justify-center">
        <div className="w-full flex gap-x-2 justify-start items-center">
          <div className="text-xs font-semibold">{name}</div>
          <div className="text-[10px] text-grayScale4">{`${department} ・ ${
            gender === 'MAN' ? '남자' : '여자'
          }`}</div>
          {endDate !== null && (
            <div className="flex justify-center items-center bg-primary text-white text-[10px] rounded-2xl px-2 py-1">
              {convertDate(endDate)}
            </div>
          )}
        </div>
        <div className="w-full flex justify-start items-center text-xs text-grayScale5">
          {lastMessage}
        </div>
      </div>
      {unRead > 0 && (
        <div className="w-[18px] h-[18px] rounded-full bg-primary text-white text-xs flex justify-center items-center">
          {unRead}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
