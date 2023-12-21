import React from 'react';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '../../assets/icon/icon_home.svg';
import { ReactComponent as User } from '../../assets/icon/icon_user.svg';
import { ReactComponent as Chat } from '../../assets/icon/icon_chat.svg';

const BottomNav = () => {
  return (
    <div className="w-full h-[99px] flex border-t border-[#EEE] pb-10 pt-[14px]">
      <div className="grow 1 flex justify-center items-center">
        <div className="w-[21px] h-[21px]">
          <Home />
        </div>
      </div>
      <div className="grow 1 flex justify-center items-center">
        <div className="w-[21px] h-[21px]">
          <Chat />
        </div>
      </div>
      <div className="grow 1 flex justify-center items-center">
        <div className="w-[21px] h-[21px]">
          <User />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
