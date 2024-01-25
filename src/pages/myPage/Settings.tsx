import React, { useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import { ReactComponent as SmallNext } from '../../assets/icon/icon_next_small.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { logOut, withdraw } from '../../api/userApi';
import { CustomError } from '../../data/type';

const SettingsPage = () => {
  const [isLogOutOpen, setIsLogOutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const navigate = useNavigate();

  const openLogOut = () => {
    setIsLogOutOpen(true);
  };
  const openWithdraw = () => {
    setIsWithdrawOpen(true);
  };

  const handleLogOut = () => {
    tryLogOut();
  };

  const handleWithdraw = () => {
    tryWithdraw();
  };

  const { mutate: tryLogOut } = useMutation(() => logOut(), {
    onSuccess: (data) => {
      setIsLogOutOpen(false);
      navigate('/onboarding');
      console.log('로그아웃 성공');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      const customErr = error as CustomError;
      if (customErr.response?.status === 500) {
        console.log('오류가 발생하였습니다.');
      }
    },
  });

  const { mutate: tryWithdraw } = useMutation(() => withdraw(), {
    onSuccess: (data) => {
      setIsWithdrawOpen(false);
      navigate('/onboarding');
      console.log('탈퇴 성공');
    },
    onError: (error: unknown) => {
      console.log(error);
      const customErr = error as CustomError;
      if (customErr.response?.status === 500) {
        console.log('오류가 발생하였습니다.');
      }
    },
  });

  return (
    <div className="p-4 grid grid-cols-1 pt-[32px] w-full grow text-base text-black font-semibold">
      <HeaderBar text="설정" />
      <div className="flex justify-between items-center text-[14px] font-normal border-b-[1px] border-[#f7f7f7] py-[23px] cursor-pointer">
        <div>알림 설정</div>
        <SmallNext />
      </div>
      <div className="flex justify-between items-center text-[14px] font-normal border-b-[1px] border-[#f7f7f7] py-[23px] cursor-pointer">
        <div>비밀번호 변경</div>
        <SmallNext />
      </div>{' '}
      <div
        className="flex justify-between items-center text-[14px] font-normal border-b-[1px] border-[#f7f7f7] py-[23px] cursor-pointer"
        onClick={openLogOut}
      >
        <div>로그아웃</div>
        <SmallNext />
      </div>{' '}
      <div
        className="flex justify-between items-center text-[14px] font-normal  py-[23px] cursor-pointer"
        onClick={openWithdraw}
      >
        <div>탈퇴하기</div>
        <SmallNext />
      </div>
      <div
        className={`w-full max-w-[450px] h-full bg-black opacity-50 fixed left-0 right-0 bottom-0 mx-auto z-5 ${
          isLogOutOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsLogOutOpen(false)}
      />
      <div
        className={`z-10 w-full max-w-[450px] pb-[37px] rounded-t-3xl fixed bottom-0 left-0 right-0 mx-auto box-border bg-white transition-transform transform ${
          isLogOutOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-full flex flex-col justify-center items-center py-4 relative border-b border-solid border-grayScale1">
          <div className="text-black text-[20px] font-semibold] mt-[30px]">
            로그아웃하시겠습니까?
          </div>
          <div className="text-[#999] text-[16px] mt-[17px]">
            홈 화면으로 돌아갑니다.
          </div>
          <div className="flex mt-[43px] justify-evenly w-full">
            <button
              className="w-[174px] h-[57px] rounded-[27px] bg-[#E5E5E5] text-black text-[18px]"
              onClick={() => setIsLogOutOpen(false)}
            >
              아니요
            </button>
            <button
              className="w-[174px] h-[57px] rounded-[27px] bg-[#FF6C3E] text-white text-[18px]"
              onClick={handleLogOut}
            >
              예
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-5 pt-4 pb-6 px-4 border-b border-solid border-grayScale1"></div>
      </div>
      <div
        className={`w-full max-w-[450px] h-full bg-black opacity-50 fixed left-0 right-0 bottom-0 mx-auto z-5 ${
          isWithdrawOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsWithdrawOpen(false)}
      />
      <div
        className={`z-10 w-full max-w-[450px] pb-[37px] rounded-t-3xl fixed bottom-0 left-0 right-0 mx-auto box-border bg-white transition-transform transform ${
          isWithdrawOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-full flex flex-col justify-center items-center py-4 relative border-b border-solid border-grayScale1">
          <div className="text-black text-[20px] font-semibold] mt-[30px]">
            정말 탈퇴하시겠습니까?
          </div>
          <div className="text-[#999] text-[16px] mt-[17px]">
            회원 탈퇴 후 30일간 재가입이 불가합니다.
          </div>
          <div className="flex mt-[43px] justify-evenly w-full">
            <button
              className="w-[174px] h-[57px] rounded-[27px] bg-[#E5E5E5] text-black text-[18px]"
              onClick={() => setIsLogOutOpen(false)}
            >
              아니요
            </button>
            <button
              className="w-[174px] h-[57px] rounded-[27px] bg-[#FF6C3E] text-white text-[18px]"
              onClick={handleWithdraw}
            >
              예
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-5 pt-4 pb-6 px-4 border-b border-solid border-grayScale1"></div>
      </div>
    </div>
  );
};

export default SettingsPage;
