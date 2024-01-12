import React, { useState } from 'react';
import OnboardingSlide from './OnboardingSlide';
// import OnboardingSlide from './OnboardingSlide';

const OnboardingSlider = () => {
  const [state, setState] = useState(1);
  const [touchX, setTouchX] = useState(0);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchX - e.changedTouches[0].clientX > 0) {
      handleSlideNext();
    } else {
      handleSlidePrev();
    }
  };

  const moveStyle: { [key: number]: string } = {
    1: 'translate-x-0',
    2: '-translate-x-[33.3%]',
    3: '-translate-x-[66.6%]',
  };

  const handleSlideNext = () => {
    if (state === 3) {
      setState(1);
    } else {
      setState(state + 1);
    }
    console.log('NEXT : ', state);
  };

  const handleSlidePrev = () => {
    if (state === 1) {
      setState(3);
    } else {
      setState(state - 1);
    }
    console.log('PREV : ', state);
  };

  return (
    <div className="w-full grow flex flex-col justify-start mb-[46px] gap-y-16">
      <div
        className="grow flex gap-x-20 overflow-hidden items-center"
        onClick={handleSlideNext}
      >
        <div
          className={`flex items-center h-full transition-transform ease-in-out delay-150  ${moveStyle[state]}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <OnboardingSlide state={1} />
          <OnboardingSlide state={2} />
          <OnboardingSlide state={3} />
        </div>
      </div>
      <div className="flex w-full gap-x-2 items-center justify-center">
        <div
          className={
            'w-2 h-2 rounded-full ' +
            (state === 1 ? 'bg-primary' : 'bg-subGray')
          }
        />
        <div
          className={
            'w-2 h-2 rounded-full ' +
            (state === 2 ? 'bg-primary' : 'bg-subGray')
          }
        />
        <div
          className={
            'w-2 h-2 rounded-full ' +
            (state === 3 ? 'bg-primary' : 'bg-subGray')
          }
        />
      </div>
    </div>
  );
};

export default OnboardingSlider;
