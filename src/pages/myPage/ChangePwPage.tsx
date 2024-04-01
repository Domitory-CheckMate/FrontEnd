import React from 'react';
import FindPwPage3 from '../../components/myPage/FindPwPage3';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import { ReactComponent as Home } from '../../assets/icon/icon_home_line.svg';
import { useNavigate } from 'react-router-dom';

const ChangePwPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div className="flex justify-between items-center w-full h-[24px] px-4 mt-[65px] relative">
        <div className="w-1/3 flex items-center gap-[16px]">
          <Prev className="cursor-pointer" onClick={() => navigate(-1)} />{' '}
          <Home className="cursor-pointer" onClick={() => navigate('/main')} />{' '}
        </div>
        <div className="text-[18px] font-bold">비밀번호 변경</div>
        <div className="w-1/3"></div>
      </div>{' '}
      <FindPwPage3 />
    </div>
  );
};

export default ChangePwPage;
