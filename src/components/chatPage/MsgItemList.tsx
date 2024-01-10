// ChatItemList.tsx 파일에 ChatItemList 컴포넌트 정의
import React from 'react';
import MsgItem from './MsgItem'; // ChatItem 컴포넌트 import
import { MsgItem as MsgItemType } from '../../types'; // ChatItem 타입 import

const MsgItemList: React.FC<{ msgItems: MsgItemType[] }> = ({ msgItems }) => {
  return (
    <div className="w-full h-full">
      {msgItems.map((item, index) => (
        <MsgItem key={index} {...item} />
      ))}
    </div>
  );
};

export default MsgItemList;
