import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';

const HeaderBar = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full px-4 mt-[65px] relative">
      <div className="w-1/3">
        <Prev className="cursor-pointer" onClick={() => navigate(-1)} />{' '}
      </div>
      <div className="text-[18px] font-bold">{text}</div>
      <div className="w-1/3"></div>
    </div>
  );
};

export default HeaderBar;
