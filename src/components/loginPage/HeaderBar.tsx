import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';

const HeaderBar = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full px-4 mt-[65px] relative">
      <Prev
        className="absolute inset-y-0 left-4 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="text-[18px] font-bold">{text}</div>
    </div>
  );
};

export default HeaderBar;
