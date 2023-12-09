import React from 'react';
import { useState, useEffect } from 'react';
import HeaderBar from '../components/joinPage/HeaderBar';
import NextButton from '../components/joinPage/NextButton';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Look } from '../assets/icon/icon_look.svg';
import { ReactComponent as Check } from '../assets/icon/icon_check.svg';

const CheckLine = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <div className="">{text}</div>
      <Check className="" />
    </div>
  );
};

const JoinInfoPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // const [nameComment, setNameComment] =
  //   useState<string>('올바른 이름을 입력해주세요');
  const [emailComment, setEmailComment] =
    useState<string>('이미 가입된 이메일입니다.');

  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);

  const [isCanBeNext, setIsCanBeNext] = useState(true);

  useEffect(() => {
    // 이름 확인
    if (name.length > 0) {
      //setNameComment('');
      setIsNameValid(true);
    } else {
      //setNameComment('올바른 이름을 입력해주세요');
      setIsNameValid(false);
    }

    // 이메일 확인
    if (email.length > 0) {
      setEmailComment('');
      setIsEmailValid(true);
    } else {
      setEmailComment('이미 가입된 이메일입니다.');
      setIsEmailValid(false);
    }

    // 비밀번호 확인
    if (password.length > 0) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }

    // 비밀번호 일치 확인
    if (password === confirmedPassword && confirmedPassword.length > 0) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }

    // 모든 조건이 만족할 때 다음 버튼 활성화
    if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
      setIsCanBeNext(true);
    } else {
      setIsCanBeNext(false);
    }
  }, [name, email, password, confirmedPassword, isPasswordMatch]);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <HeaderBar text="회원가입" />
      <div className="w-full px-4 flex flex-col gap-y-[16px] mt-10 text-sm">
        <div className="flex flex-col">
          <div className="font-semibold text-sm">이름</div>
          <input
            className="py-4 text-base outline-none border-b border-[#CCCCCC]  placeholder:text-defaultTextGray"
            type="text"
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-sm ">아이디(이메일)</div>
          <input
            className="py-4 outline-none border-b text-base border-[#CCCCCC]  placeholder:text-defaultTextGray"
            type="text"
            placeholder="아이디(이메일)"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-xs mt-[9px] text-[#FF6C3E]">{emailComment}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-sm ">비밀번호</div>
          <div className="w-full flex border-b border-[#CCCCCC]">
            <input
              className="w-full py-4 outline-none text-base placeholder:text-defaultTextGray"
              type="password"
              placeholder="8~20자 대소문자 영문, 숫자, 특수문자"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-center mr-[8px]">
              <Look className="" />
            </div>
          </div>
          <div className="text-xs mt-[9px] flex items-center text-[#CCCCCC] space-x-2">
            <CheckLine text="대소문자" /> <CheckLine text="숫자" />
            <CheckLine text="특수문자" />
            <CheckLine text="8-20자 이내" />
          </div>
          <div className="w-full flex border-b border-[#CCCCCC]">
            <input
              className="w-full py-4 outline-none text-base placeholder:text-defaultTextGray"
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
            <div className="flex items-center justify-center mr-[8px]">
              <Look className="" />
            </div>
          </div>
          <div className="text-xs mt-[9px] text-[#CCCCCC]">
            <CheckLine text="비밀번호 일치" />
          </div>
        </div>
      </div>
      <NextButton
        text="회원가입"
        isCanBeNext={isCanBeNext}
        onClick={() => navigate('/join/auth')}
      />
    </div>
  );
};

export default JoinInfoPage;
