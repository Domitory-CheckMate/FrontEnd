import React from 'react';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '../../assets/icon/icon_home.svg';
import { ReactComponent as Chat } from '../../assets/icon/icon_chat.svg';
import { ReactComponent as User } from '../../assets/icon/icon_user.svg';
import { ReactComponent as HomeSelect } from '../../assets/icon/icon_home_select.svg';
import { ReactComponent as ChatSelect } from '../../assets/icon/icon_chat_select.svg';
import { ReactComponent as UserSelect } from '../../assets/icon/icon_user_select.svg';
import { bottomNavType } from '../../data/type';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({
  state,
  notReadCnt,
}: {
  state: bottomNavType;
  notReadCnt: number;
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 bg-white w-full h-[99px] flex justify-center items-start border-t border-[#EEE] pb-10 pt-[14px]">
      <div className="grow 1 flex justify-center items-center">
        <div
          className="w-[21px] h-[21px] cursor-pointer"
          onClick={() => navigate('/main')}
        >
          {state === 'home' ? <HomeSelect /> : <Home />}
        </div>
      </div>
      <div className="grow 1 flex justify-center items-center">
        <div
          className="w-[21px] h-[21px] cursor-pointer relative"
          onClick={() => navigate('/chat')}
        >
          {state === 'chat' ? <ChatSelect /> : <Chat />}
          {notReadCnt > 0 && (
            <div className="absolute -top-[7px] -right-[8px] w-[18px] h-[18px] bg-primary rounded-full flex justify-center items-center text-white text-[10px] leading-[7px]">
              {notReadCnt}
            </div>
          )}
        </div>
      </div>
      <div className="grow 1 flex justify-center items-center">
        <div
          className="w-[21px] h-[21px] cursor-pointer"
          onClick={() => navigate('/my-page')}
        >
          {state === 'user' ? <UserSelect /> : <User />}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
