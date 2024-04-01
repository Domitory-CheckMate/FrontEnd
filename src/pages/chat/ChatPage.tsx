import React from 'react';

import BottomNav from '../../components/myPage/BottomNav';
import { socketRoomType } from '../../socket/responseType';
import ChatItem from '../../components/chatPage/ChatItem';
import { useNavigate } from 'react-router-dom';
// import { unSubscribeChatRoom } from '../../socket/socketClient';
// import { getAccessToken } from '../../api/manageLocalStorage';

const ChatPage = ({
  chatRoomList,
  notReadCnt,
}: {
  chatRoomList: socketRoomType[];
  notReadCnt: number;
}) => {
  const navigate = useNavigate();

  const handleChatRoomClick = (destId: number, name: string) => {
    navigate(`/chat/${destId}`, { state: name });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="shrink-0 w-full flex justify-center items-center pt-14 pb-7 relative">
        {/* <div className="w-1/3"></div> */}
        <div className="text-[18px] font-bold">채팅</div>
        {/* <div
          className="w-1/3 flex justify-end items-center text-primary text-[18px]"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? '삭제' : '편집'}
        </div> */}
      </div>
      <div className="w-full grow mb-[100px]">
        <div className="h-full w-full px-4 flex flex-col">
          {chatRoomList.length < 1 ? (
            <div className="grow w-full flex justify-center items-center">
              <div className="text-grayScale5">대화 중인 채팅이 없어요.</div>
            </div>
          ) : (
            <>
              <div className="shrink-0 flex justify-start text-[10px] text-[#666] font-medium">
                <div>{`총 ${chatRoomList.length}건`}</div>
              </div>
              <div className="grow w-full flex flex-col overflow-hidden mt-1.5">
                <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
                  {chatRoomList.map((chatRoom, idx) => {
                    return (
                      <ChatItem
                        key={idx}
                        img={chatRoom.userInfo.profile}
                        name={chatRoom.userInfo.name}
                        department={chatRoom.userInfo.major}
                        gender={chatRoom.userInfo.gender}
                        endDate={chatRoom.userInfo.endDate}
                        unRead={chatRoom.notReadCount}
                        lastMessage={chatRoom.lastChatInfo.content}
                        onClickHandler={() =>
                          handleChatRoomClick(
                            chatRoom.userInfo.userId,
                            chatRoom.userInfo.name,
                          )
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <BottomNav state="chat" notReadCnt={notReadCnt} />
    </div>
  );
};

export default ChatPage;
