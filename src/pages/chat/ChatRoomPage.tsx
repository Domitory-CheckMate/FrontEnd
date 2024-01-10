import React, { useEffect, useState } from 'react';

import { ReactComponent as Left } from '../../assets/icon/icon_left.svg';
import { ReactComponent as Search } from '../../assets/icon/icon_chat_search.svg';
import { ReactComponent as More } from '../../assets/icon/icon_more_vertical.svg';
import { ReactComponent as Calendar } from '../../assets/icon/icon_calendar.svg';
import ChatInput from '../../components/chatPage/ChatInput';
import MsgItemList from '../../components/chatPage/MsgItemList';

import MsgItem from '../../components/chatPage/MsgItem';
import { MsgItem as MsgItemType } from '../../types'; // ChatItem 타입 import

const ChatRoomPage = () => {
  const name = '홍길동';

  // useEffect(() => {
  //   // API에서 데이터를 가져와서 chatItems 상태를 업데이트
  //   // fetch('your_api_endpoint')
  //   //   .then((response) => response.json())
  //   //   .then((data) => setChatItems(data))
  //   //   .catch((error) => console.error('Error fetching data:', error));

  // }, []);

  const [msgItems, setMsgItems] = useState<MsgItemType[]>([]);

  const exampleChatItems = [
    {
      img: 'img',
      id: 0,
      name: '홍길동',
      content: '안녕하세요. 혹시 공강은 언제이신가요?',
      time: '오전 8:05',
    },
    {
      img: 'img',
      id: 1,
      name: '홍길동',
      content: '저도 잘 모르겠네요',
      time: '오전 8:05',
    },
    {
      img: 'img',
      id: 0,
      name: '홍길동',
      content: '알아봐주세요!',
      time: '오전 8:05',
    },
  ];
  useEffect(() => {
    setMsgItems(exampleChatItems);

    // // API에서 데이터를 가져와서 chatItems 상태를 업데이트
    // fetch('your_api_endpoint')
    //   .then((response) => response.json())
    //   .then((data) => setChatItems(data))
    //   .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start ">
      <div className="flex justify-between items-center w-full mt-[65px] relative mb-[13px] px-[16px]">
        <div className="w-1/3">
          <Left />
        </div>
        <div className="text-[18px] font-bold">{name}</div>
        <div className="w-1/3 flex justify-end">
          <Search className="mr-[21px]" />
          <More />
        </div>
      </div>
      <div className="flex w-full border-y-[1px] border-[#F7F7F7] py-[19px] px-[16px] justify-between items-center">
        <div className="flex flex-col">
          <div className=" text-[14px] text-black font-semibold">
            내 체크리스트랑 딱 맞는 사람만!
          </div>
          <div className="flex text-[12px] text-[#666] font-normal mt-[10px]">
            <Calendar className="mr-[10px]" />
            ~1월 19일(금) 까지
          </div>
        </div>
        <div className="border-[1px] border-[#999999] rounded-[26px] p-[7px] text-[#666666] text-[10px] font-medium">
          모집글 보기
        </div>
      </div>
      <div className="p-[16px] w-full grow">
        <MsgItemList msgItems={msgItems} />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatRoomPage;
