import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';

const HeaderBar = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  return (
    <div className="shrink-0 h-[90px] flex justify-center items-end w-full px-4 pb-3">
      <div className="w-full flex justify-center items-center relative">
        <Prev
          className="absolute inset-y-0 left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-[18px] font-bold">{text}</div>
      </div>
    </div>
  );
};

export default HeaderBar;
