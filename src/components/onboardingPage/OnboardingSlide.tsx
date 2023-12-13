import React from 'react';
import { ReactComponent as Onboarding1 } from '../../assets/icon/onboarding_1.svg';
import { ReactComponent as Onboarding2 } from '../../assets/icon/onboarding_2.svg';
import { ReactComponent as Onboarding3 } from '../../assets/icon/onboarding_3.svg';

const OnboardingSlide = ({ state }: { state: number }) => {
  return (
    <div className="w-screen max-w-[450px] h-full flex flex-col justify-between gap-y-16">
      <div className="w-full text-[22px] p-4 font-medium flex flex-col justify-center items-start leading-8 mt-[132px]">
        {state === 1 ? (
          <>
            <div>
              체크메이트로 <span className="text-primary">많은 룸메이트를</span>
            </div>
            <div>
              <span className="text-primary">빠르게</span> 찾아보세요
            </div>
          </>
        ) : state === 2 ? (
          <>
            <div>
              체크메이트로 <span className="text-primary">원하는 조건의</span>
            </div>
            <div>
              <span className="text-primary">룸메이트를 쉽게</span> 찾아보세요
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="text-primary">체크메이트와 함께</span>라면
            </div>
            <div>룸메이트 찾기 어렵지 않아요</div>
          </>
        )}
      </div>
      <div className="relative w-full">
        {state === 1 && <Onboarding1 width={'100%'} />}
        {state === 2 && <Onboarding2 width={'100%'} />}
        {state === 3 && <Onboarding3 width={'100%'} />}
      </div>
    </div>
  );
};

export default OnboardingSlide;
