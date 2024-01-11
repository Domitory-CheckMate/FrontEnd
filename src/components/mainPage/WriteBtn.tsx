import React from 'react';
import { ReactComponent as Plus } from '../../assets/icon/icon_plus_white.svg';
import { useNavigate } from 'react-router-dom';

const WriteBtn = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center gap-x-[4.5px] text-white text-sm text-semibold py-[13px] px-[19px] rounded-full bg-primary fixed bottom-[108px] cursor-pointer"
      onClick={() => navigate('/write')}
    >
      <Plus />
      글쓰기
    </div>
  );
};

export default WriteBtn;
