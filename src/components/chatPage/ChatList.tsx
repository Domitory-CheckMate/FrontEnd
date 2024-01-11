// ChatItemList.tsx 파일에 ChatItemList 컴포넌트 정의
import React from 'react';
import ChatItem from './ChatItem'; // ChatItem 컴포넌트 import
import { ChatItem as ChatItemType } from '../../types'; // ChatItem 타입 import

const ChatItemList: React.FC<{ chatItems: ChatItemType[] }> = ({
  chatItems,
}) => {
  return (
    <div className="w-full h-full">
      {chatItems.map((item, index) => (
        <ChatItem key={index} {...item} />
      ))}
    </div>
  );
};

export default ChatItemList;
