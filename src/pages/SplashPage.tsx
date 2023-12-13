import React, { useEffect } from 'react';
import { ReactComponent as Logo } from '../assets/logo/logo_splash.svg';
import { ReactComponent as LogoText } from '../assets/logo/logo_text_black.svg';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="grow flex items-center justify-center">
        <Logo />
      </div>
      <LogoText className="mb-[96px]" />
    </div>
  );
};

export default SplashPage;
