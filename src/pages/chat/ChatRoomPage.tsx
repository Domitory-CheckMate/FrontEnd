import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as Left } from '../../assets/icon/icon_left.svg';
import { ReactComponent as More } from '../../assets/icon/icon_more_vertical.svg';
import { ReactComponent as Calendar } from '../../assets/icon/icon_calendar.svg';
import ChatInput from '../../components/chatPage/ChatInput';
import { Client } from '@stomp/stompjs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAccessToken, getMemberId } from '../../api/manageLocalStorage';
import {
  enterRoomPublish,
  getPrevChatPublish,
  sendMessagePublish,
  unSubscribeChatRoom,
} from '../../socket/socketClient';
import { msgItemType } from '../../data/type';
import { socketReceiverType } from '../../socket/responseType';
import SenderMsgItem from '../../components/chatPage/SenderMsgItem';
import ReceiverMsgItem from '../../components/chatPage/ReceiverMsgItem';

const ChatRoomPage = ({ client }: { client: Client | null }) => {
  const navigate = useNavigate();
  const token = getAccessToken() || '';
  const myId = getMemberId() || '';
  const params = useParams();
  const receiverId = params.receiverId || '';
  const locate = useLocation();
  const name = locate.state as string;
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [receiverInfo, setReceiverInfo] = useState<socketReceiverType | null>(
    null,
  );
  const [msgItems, setMsgItems] = useState<msgItemType[]>([]);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const sendMessageHandler = (msg: string) => {
    if (msg.length <= 0 || client === null) return;

    console.log('메세지 전송 시도 --> ', msg);
    sendMessagePublish(client, token, msg);
  };

  const subscribeChatRoomCallback = (message: { body: string }) => {
    try {
      if (message.body) {
        const data = JSON.parse(message.body);
        console.log('채팅방 구독 데이터 받음 --> ', data);
        if (data.messageType === 'ROOM_ENTER') {
          console.log('채팅방 입장 성공 --> ', data.data);
          if (client !== null && token !== '' && receiverId !== '') {
            getPrevChatPublish(client, token, Number(receiverId), 0);
          }
        } else if (data.messageType === 'CHAT_LIST') {
          console.log('이전 채팅 불러오기 성공  --> ', data.data);
          if (data.data.requestUserId === Number(myId)) {
            setReceiverInfo(data.data.chatUserInfoDto);
            setMsgItems(data.data.chatMessageList.reverse());
          }
        } else if (data.messageType === 'CHAT') {
          console.log('메세지 전송 성공 --> ', data.data);
          setMsgItems((prev) => [
            ...prev,
            {
              content: data.data.content,
              isRead: data.data.isRead,
              sendTime: data.data.sendTime,
              userId: data.data.senderId,
            },
          ]);
        } else {
          console.log('채팅방 입장 데이터가 아닙니다.');
        }
      } else {
        console.error('Message body is empty or undefined.');
      }
    } catch (err) {
      console.error('Error parsing : ', err);
    }
  };

  useEffect(() => {
    if (client === null || token === '' || myId === '' || receiverId === '')
      return;

    console.log('채팅방 입장 시도');
    enterRoomPublish(
      client,
      token,
      Number(myId),
      Number(receiverId),
      subscribeChatRoomCallback,
    );

    return () => {
      console.log('채팅방 퇴장 시도');
      unSubscribeChatRoom(client, Number(myId), Number(receiverId));
    };
  }, [client, myId, token, params.receiverId]);

  useEffect(() => {
    if (chatContainerRef.current !== null) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [msgItems]);

  const isShowProfileImg = (idx: number) => {
    if (idx === 0) return true;

    const prevUserId = msgItems[idx - 1].userId;
    const curUserId = msgItems[idx].userId;

    return prevUserId !== curUserId;
  };

  const extractTimeFromString = (dateTime: string): string => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const areDatesEqual = (date1: string, date2: string): boolean => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // Date 객체를 직접 비교
    return firstDate.toDateString() === secondDate.toDateString();
  };

  // 이전 메시지와 날짜가 다를 경우 날짜를 표시하는 함수
  const renderDateIfNeeded = (
    sendTime: string,
    index: number,
  ): JSX.Element | null => {
    if (index === 0) {
      // 첫 번째 메시지는 항상 표시
      return (
        <div className="text-center text-xs text-grayScale4 mt-2.5">
          {new Date(sendTime).toLocaleDateString()}
        </div>
      );
    }

    // 현재 메시지와 이전 메시지의 날짜가 다를 경우에만 표시
    const prevSendTime = msgItems[index - 1].sendTime;
    if (!areDatesEqual(sendTime, prevSendTime)) {
      return (
        <div className="text-center text-[12px] text-gray-500 mt-[10px]">
          {new Date(sendTime).toLocaleDateString()}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative overflow-hidden">
      <div className="flex justify-between items-center w-full mt-[65px] relative mb-[13px] px-[16px]">
        <div className="w-1/3 cursor-pointer">
          <Left onClick={() => navigate(-1)} />
        </div>
        <div className="text-[18px] font-bold">{name}</div>
        <div className="w-1/3 flex justify-end">
          <More
            className="cursor-pointer"
            onClick={() => setIsOpenMenu(true)}
          />
        </div>
      </div>
      <div className="flex w-full border-y-[1px] border-[#F7F7F7] py-[19px] px-[16px] justify-between items-center">
        <div className="flex flex-col">
          <div className=" text-[14px] text-black font-semibold">
            {receiverInfo?.title || ''}
          </div>
          <div className="flex text-[12px] text-[#666] font-normal mt-[10px]">
            <Calendar className="mr-[10px]" />
            {`~${receiverInfo?.endDate || ''}까지`}
          </div>
        </div>
        <div
          className="border-[1px] border-[#999999] rounded-[26px] p-[7px] text-[#666666] text-[10px] font-medium cursor-pointer"
          onClick={() => {
            receiverInfo && navigate(`/article/${receiverInfo.postId}`);
          }}
        >
          모집글 보기
        </div>
      </div>
      <div
        className="p-4 w-full grow flex flex-col items-center gap-y-3 overflow-auto scrollbar-hide"
        ref={chatContainerRef}
      >
        {msgItems.map((msgItem, idx) => (
          <div
            key={idx}
            className="w-full flex flex-col justify-start items-center gap-y-5"
          >
            {renderDateIfNeeded(msgItem.sendTime, idx)}
            {msgItem.userId === Number(myId) ? (
              <SenderMsgItem
                content={msgItem.content}
                time={extractTimeFromString(msgItem.sendTime)}
                isRead={msgItem.isRead}
              />
            ) : (
              <ReceiverMsgItem
                content={msgItem.content}
                time={extractTimeFromString(msgItem.sendTime)}
                isShowImg={isShowProfileImg(idx)}
                img={receiverInfo?.profile || ''}
                isRead={msgItem.isRead}
              />
            )}
          </div>
        ))}
      </div>

      <ChatInput sendHandler={sendMessageHandler} />
      <div
        className={`z-10 absolute bottom-0 w-full h-full bg-black/50 ${
          isOpenMenu ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpenMenu(false)}
      />
      <div
        className={`z-10 absolute bottom-0 w-full transition-transform transform flex flex-col justify-end items-center px-4 gap-y-2.5 text-sm ${
          isOpenMenu ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div
          className={`w-full flex justify-center items-center rounded-[14px] bg-white`}
          onClick={() => setIsOpenMenu(false)}
        >
          <div
            className="w-full flex justify-center items-center py-3 border-b border-solid border-grayScale2 last:border-b-0 cursor-pointer"
            onClick={() => {
              navigate('/report', {
                state: {
                  reportCase: 'CHAT',
                  reportTarget:
                    myId > receiverId
                      ? `${receiverId}+${myId}`
                      : `${myId}+${receiverId}`,
                },
              });
            }}
          >
            신고
          </div>
        </div>
        <div
          className={`w-full mb-[38px] py-3 flex justify-center items-center rounded-[14px] bg-white cursor-pointer`}
          onClick={() => setIsOpenMenu(true)}
        >
          취소
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
