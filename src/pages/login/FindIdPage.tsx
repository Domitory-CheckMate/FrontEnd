import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompleteButton from '../../components/loginPage/CompleteButton';
import FindIdPage1 from '../../components/loginPage/FindIdPage1';
import FindIdPage2 from '../../components/loginPage/FindIdPage2';
import HeaderBar from '../../components/loginPage/HeaderBar';
import { ReactComponent as Close } from '../../assets/icon/icon_close.svg';

const FindIdPage = () => {
  const navigate = useNavigate();
  const [findIdLevel, setFindIdLevel] = useState(1); // [1, 2, 3

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <HeaderBar text="아이디 찾기" />
      {findIdLevel === 1 ? (
        <FindIdPage1 handleNextStep={setFindIdLevel} />
      ) : findIdLevel === 2 ? (
        <FindIdPage2 handleNextStep={setFindIdLevel} />
      ) : (
        <div>오류가 발생했습니다.</div>
      )}
      <div
        className={
          'z-10 w-full pt-[50px] px-4 absolute bottom-0 rounded-t-[28px] bg-white flex flex-col gap-y-9 transition-all ease-out duration-300 transform' +
          (findIdLevel === 3 ? ' translate-y-0' : ' translate-y-full')
        }
      >
        <Close className="absolute top-5 right-4" />
        <div className="w-full flex items-center justify-center text-[20px] whitespace-pre-line leading-8 text-center">{`입력하신 정보와\n일치하는 아이디가 없습니다.`}</div>
        <CompleteButton
          text="회원가입하기"
          onClick={() => {
            navigate('/join');
          }}
          isAble={true}
        />
      </div>
      <div
        className={
          'w-full h-full absolute bg-modalBackground' +
          (findIdLevel === 3 ? ' flex' : ' hidden')
        }
        onClick={() => {
          setFindIdLevel(1);
        }}
      />
    </div>
  );
};

export default FindIdPage;
