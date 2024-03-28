import React from 'react';
import { ReactComponent as Onboarding1 } from '../../assets/illust/onboarding1.svg';
import { ReactComponent as Onboarding2 } from '../../assets/illust/onboarding2.svg';
import { ReactComponent as Onboarding3 } from '../../assets/illust/onboarding3.svg';

const OnboardingSlide = ({ state }: { state: number }) => {
  return (
    <div className="w-screen max-w-[450px] h-full flex flex-col justify-center pt-8">
      <div className="w-full text-xl p-4 font-medium flex flex-col justify-center items-start leading-8">
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
      <div className="relative w-full xs:h-60 sm:h-80 h-96 mt-10 flex justify-center items-center">
        {state === 1 && <Onboarding1 className="w-full object-cover" />}
        {state === 2 && <Onboarding2 className="w-full object-cover" />}
        {state === 3 && <Onboarding3 className="w-full object-cover" />}
      </div>
    </div>
  );
};

export default OnboardingSlide;
