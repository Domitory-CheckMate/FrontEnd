import React, { useState, useEffect } from 'react';

import BottomNav from '../../components/myPage/BottomNav';
import DefaultPage from '../../components/chatPage/DefaultPage';
import ChatItemList from '../../components/chatPage/ChatList';
import { ChatItem as ChatItemType } from '../../types'; // ChatItem 타입 import
import { ReactComponent as Down } from '../../assets/icon/icon_down_gray.svg';

const ChatPage = () => {
  const [chatState, setChatState] = React.useState('chat');

  const removeChat = () => {};

  const [order, setOrder] = useState('최신순');

  const [chatItems, setChatItems] = useState<ChatItemType[]>([]);
  const exampleChatItems = [
    {
      img: 'img',
      name: '홍길동',
      content: '안녕하세요. 혹시 공강은 언제이신가요?',
      period: 'D-20',
      info: '소프트웨어학과 ・ 여자',
      newChat: 1,
    },
    {
      img: 'img',
      name: '임꺽정',
      content: '안녕하세요. 혹시 공강은 언제이신가요?',
      period: 'D-10',
      info: '소프트웨어학과 ・ 여자',
      newChat: 2,
    },
    {
      img: 'img',
      name: '이순신',
      content: '안녕하세요. 혹시 공강은 언제이신가요?',
      period: '모집완료',
      info: '소프트웨어학과 ・ 남자',
      newChat: 3,
    },
  ];
  useEffect(() => {
    setChatItems(exampleChatItems);

    // // API에서 데이터를 가져와서 chatItems 상태를 업데이트
    // fetch('your_api_endpoint')
    //   .then((response) => response.json())
    //   .then((data) => setChatItems(data))
    //   .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    setOrder('최신순');
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-[16px]">
      <div className="flex justify-between items-center w-full mt-[65px] relative mb-[48px]">
        <div className="w-1/3"></div>
        <div className="text-[18px] font-bold">
          {chatState === 'edit' && <div>편집</div>}
          {chatState === 'default' && <div>채팅</div>}
          {chatState === 'chat' && <div>채팅</div>}
        </div>
        <div className="w-1/3 flex justify-end">
          {chatState === 'chat' && (
            <div
              className="text-primary text-[18px]"
              onClick={() => setChatState('chat')}
            >
              편집
            </div>
          )}
          {chatState === 'edit' && (
            <div className="text-primary text-[18px]" onClick={removeChat}>
              삭제
            </div>
          )}
        </div>
      </div>
      {chatState === 'default' && <DefaultPage />}
      {chatState !== 'default' && (
        <div className="w-full h-full">
          <div className="flex justify-between text-[10px] text-[#666] font-medium">
            <div>총{exampleChatItems.length}건</div>
            <div className="font-normal flex items-center gap-[6px]">
              {order}
              <Down />
            </div>
          </div>{' '}
          <ChatItemList chatItems={chatItems} />
        </div>
      )}

      <BottomNav state="chat" />
    </div>
  );
};

export default ChatPage;
