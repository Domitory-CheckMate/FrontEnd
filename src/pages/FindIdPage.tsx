import React from 'react';
import CompleteButton from '../components/loginPage/CompleteButton';
import HeaderBar from '../components/loginPage/HeaderBar';

const FindIdPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <HeaderBar text="아이디 찾기" />
      <div className="flex flex-col w-full items-start px-4 mt-14">
        <input
          type="text"
          placeholder="이름"
          className="w-full py-[23px] outline-none border-b border-[#CCCCCC]"
        />
        <div className="mt-[22px] w-full">
          <div className="flex w-full items-center">
            <input
              type="tel"
              placeholder="휴대폰 번호 (-제외)"
              className="grow py-[23px] outline-none bg-transparent"
              maxLength={11}
            />
            <button
              type="button"
              className="text-sm w-[104px] h-9 leading-normal rounded-full bg-[#CBCBCC] text-white"
            >
              인증번호 전송
            </button>
          </div>
          <div className="w-full h-px bg-[#CCCCCC]" />
          <div className="flex flex-col mt-[14px] text-[10px] leading-[18px] text-[#D0D0D0]">
            <div>인증번호 발송에는 시간이 소요됩니다.</div>
            <div>
              인증번호가 문자메시지로 발송되며, 수신하지 못했다면 차단된
              메시지를 확인해주세요.
            </div>
          </div>
        </div>
      </div>
      <CompleteButton text="확인" onClick={() => {}} />
    </div>
  );
};

export default FindIdPage;
