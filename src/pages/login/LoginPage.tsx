import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo/logo_text_black.svg';
import PrimaryFillButton from '../../components/loginPage/PrimaryFillButton';
import PrimaryStrokeButton from '../../components/loginPage/PrimaryStrokeButton';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Logo className="mt-24" />
      <div className="w-full grow flex flex-col items-center justify-center">
        <div className="w-full px-4 flex flex-col gap-y-8 text-sm">
          <div className="flex flex-col">
            <div className="font-semibold">아이디</div>
            <input
              className="py-3 outline-none border-b border-[#CCCCCC] placeholder:text-grayScale3"
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
          <PrimaryStrokeButton
            text="회원가입"
            onClick={() => navigate('/join')}
          />
          <div
            className="w-full flex items-center mt-[31px] justify-center cursor-pointer text-sm"
            onClick={() => navigate('/login/pw')}
          >
            비밀번호 찾기
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-[30px] mb-[36px] text-xs text-grayScale5 leading-3 font-medium">
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
