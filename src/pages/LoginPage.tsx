import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo/logo_text_black.svg';
import PrimaryFillButton from '../components/loginPage/PrimaryFillButton';
import PrimaryStrokeButton from '../components/loginPage/PrimaryStrokeButton';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Logo className="mt-24" />
      <div className="w-full px-4 flex flex-col gap-y-8 mt-32 text-sm">
        <div className="flex flex-col">
          <div className="font-semibold">아이디</div>
          <input
            className="py-3 outline-none border-b border-[#CCCCCC]"
            type="text"
            placeholder="예)checkmate@checkmate.co.kr"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">비밀번호</div>
          <input
            className="py-3 outline-none border-b border-[#CCCCCC]"
            type="password"
          />
        </div>
      </div>
      <div className="w-full px-4">
        <PrimaryFillButton text="로그인" onClick={() => navigate('/')} />
        <div className="flex justify-center text-sm align-center mt-8">
          <div className="cursor-pointer" onClick={() => navigate('/login/id')}>
            아이디 찾기
          </div>
          <div className="mx-[25px] text-dividerGray">|</div>
          <div className="cursor-pointer" onClick={() => navigate('/login/pw')}>
            비밀번호 찾기
          </div>
        </div>
        <PrimaryStrokeButton
          text="회원가입"
          onClick={() => navigate('/join')}
        />
      </div>
      <div className="flex flex-col items-center mt-20 text-xs text-textGray leading-3 font-medium">
        <div>로그인하시면 아래 내용에 동의하는 것으로 간주됩니다.</div>
        <div className="mt-4">
          <span>개인정보처리방침</span>
          <span className="mx-7" />
          <span>이용약관</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
