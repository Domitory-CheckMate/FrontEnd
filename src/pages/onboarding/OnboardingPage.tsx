import React from 'react';
import CompleteButton from '../../components/loginPage/CompleteButton';
import { useNavigate } from 'react-router-dom';
import OnboardingSlider from '../../components/onboardingPage/OnboardingSlider';
import { setOnboardingFinished } from '../../api/manageToken';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleOnboardingFinishClick = () => {
    setOnboardingFinished(true);
    navigate('/login');
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FFF6F3]">
      <OnboardingSlider />
      <div className="w-full px-4 flex flex-col items-center">
        <CompleteButton
          text="체크메이트 시작하기"
          isAble={true}
          onClick={() => handleOnboardingFinishClick()}
        />
        <div className="w-full flex flex-col items-center mb-[53px] text-[10px] leading-[14px] text-grayScale4 font-semibold">
          <div>회원가입 후 서비스를 이용할 수 있습니다.</div>
          <div>
            <span className="text-grayScale5">이용약관 및 학교인증</span>을
            진행해주세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
