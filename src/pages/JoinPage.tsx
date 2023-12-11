import React from 'react';
import { useState, useEffect } from 'react';
import HeaderBar from '../components/joinPage/HeaderBar';
import CheckBox from '../components/joinPage/CheckBox';
import NextButton from '../components/joinPage/NextButton';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
  const navigate = useNavigate();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isServiceChecked, setIsServiceChecked] = useState(false);
  const [isPersonalInfoChecked, setIsPersonalInfoChecked] = useState(false);
  const [isPersonalInfoProvidedChecked, setIsPersonalInfoProvidedChecked] =
    useState(false);
  const [isEventBenefitChecked, setIsEventBenefitChecked] = useState(false);

  const onAllCheckClick = () => {
    setIsAllChecked(!isAllChecked);
    onAllStateChange(!isAllChecked);
  };

  const onAllStateChange = (bool: boolean) => {
    if (bool) {
      setIsServiceChecked(true);
      setIsPersonalInfoChecked(true);
      setIsPersonalInfoProvidedChecked(true);
      setIsEventBenefitChecked(true);
      setIsCanBeNext(true);
    } else {
      setIsServiceChecked(false);
      setIsPersonalInfoChecked(false);
      setIsPersonalInfoProvidedChecked(false);
      setIsEventBenefitChecked(false);
    }
  };

  const changeServiceChecked = (bool: boolean) => {
    setIsServiceChecked(bool);
  };
  const changePersonalInfoChecked = (bool: boolean) => {
    setIsPersonalInfoChecked(bool);
  };
  const changePersonalInfoProvidedChecked = (bool: boolean) => {
    setIsPersonalInfoProvidedChecked(bool);
  };
  const changeEventBenefitChecked = (bool: boolean) => {
    setIsEventBenefitChecked(bool);
  };

  const [isCanBeNext, setIsCanBeNext] = useState(false);

  useEffect(() => {
    console.log('isServiceChecked', isServiceChecked);
    console.log('isPersonalInfoChecked', isPersonalInfoChecked);
    console.log('isPersonalInfoProvidedChecked', isPersonalInfoProvidedChecked);
    // 모든 체크박스가 체크되어 있을 때 isCanBeNext를 true로 설정
    const checkNext =
      isServiceChecked &&
      isPersonalInfoChecked &&
      isPersonalInfoProvidedChecked;
    setIsCanBeNext(checkNext);
    setIsAllChecked(checkNext && isEventBenefitChecked);
  }, [
    isServiceChecked,
    isPersonalInfoChecked,
    isPersonalInfoProvidedChecked,
    isEventBenefitChecked,
  ]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <HeaderBar text="회원가입" />
      <div className="flex flex-col w-full items-start px-4 mt-8 grow">
        <div className="leading-8 font-normal text-xl">
          체크메이트 이용을 위해
        </div>
        <div className="leading-8 font-normal text-xl">
          서비스 이용약관에 동의해주세요.
        </div>
        <div
          className="w-full flex mt-4 cursor-pointer"
          onClick={onAllCheckClick}
        >
          <input className="mr-4" checked={isAllChecked} type="checkbox" />
          <div className="grow font-bold text-sm">약관 전체 동의</div>
        </div>
        <CheckBox
          text="(필수) 서비스 이용약관 동의"
          checked={isServiceChecked}
          onClick={changeServiceChecked}
          showContents={() => navigate('/join/detail')}
        />
        <CheckBox
          text="(필수) 개인정보 수집/이용 동의"
          checked={isPersonalInfoChecked}
          onClick={changePersonalInfoChecked}
        />
        <CheckBox
          text="(필수) 개인정보 제3자 제공 동의"
          checked={isPersonalInfoProvidedChecked}
          onClick={changePersonalInfoProvidedChecked}
        />
        <CheckBox
          text="(선택) 이벤트 혜택 및 광고성 정보 수신 동의"
          checked={isEventBenefitChecked}
          onClick={changeEventBenefitChecked}
        />
      </div>
      <NextButton
        text="다음"
        isCanBeNext={isCanBeNext}
        onClick={() => navigate('/join/info')}
      />
    </div>
  );
};

export default JoinPage;
