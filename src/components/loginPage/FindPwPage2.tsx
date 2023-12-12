import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompleteButton from './CompleteButton';
import { ReactComponent as Eye } from '../../assets/icon/icon_eye.svg';
import { ReactComponent as CheckGray } from '../../assets/icon/icon_check_gray.svg';

const FindPwPage2 = ({
  handleNextStep,
}: {
  handleNextStep: (step: number) => void;
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLengthValid = password.length >= 8 && password.length <= 20;
  const isPasswordValid =
    hasUppercase &&
    hasLowercase &&
    hasDigit &&
    hasSpecialCharacter &&
    isLengthValid;

  const isPasswordConfirmValid =
    password === passwordConfirm && passwordConfirm !== '' && password !== '';

  const nextStepHandler = () => {
    navigate('/login');
    handleNextStep(1);
  };

  return (
    <>
      <div className="grow w-full px-4 flex flex-col items-start mt-[35px] whitespace-pre-line">
        <div className="w-full flex text-[20px] leading-8 ">{`체크메이트의\n비밀번호를 재설정합니다.`}</div>
        <div className="w-full flex flex-col mt-7">
          <div>비밀번호</div>
          <div className="w-full flex flex-col items-start">
            <div className="flex w-full items-center gap-x-10">
              <input
                type="password"
                placeholder="8~20자 대소문자 영문, 숫자, 특수문자"
                className="grow py-[23px] outline-none bg-transparent placeholder:text-[#D0D0D0]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Eye className="mr-[10px]" />
            </div>
            <div className="w-full h border border-solid border-dividerGray" />
            <div className="flex gap-x-2 items-center mt-[10px] text-[#CBCBCC]">
              <div
                className={
                  'flex gap-x-[3px] items-center' +
                  (hasUppercase && hasLowercase
                    ? ' text-primary'
                    : ' text-[#CBCBCC]')
                }
              >
                <div>대소문자</div>
                <CheckGray />
              </div>
              <div
                className={
                  'flex gap-x-[3px] items-center' +
                  (hasDigit ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>숫자</div>
                <CheckGray />
              </div>
              <div
                className={
                  'flex gap-x-[3px] items-center' +
                  (hasSpecialCharacter ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>특수문자</div>
                <CheckGray />
              </div>
              <div
                className={
                  'flex gap-x-[3px] items-center' +
                  (isLengthValid ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>8~20자 이내</div>
                <CheckGray />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            <div className="flex w-full items-center gap-x-10">
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="grow py-[23px] outline-none bg-transparent placeholder:text-[#D0D0D0]"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <Eye className="mr-[10px]" />
            </div>
            <div className="w-full h border border-solid border-dividerGray" />
            <div className="flex gap-x-2 items-center mt-[10px]">
              <div
                className={
                  'flex gap-x-[3px] items-center' +
                  (isPasswordConfirmValid ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>비밀번호 일치</div>
                <CheckGray />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompleteButton
        text="로그인하기"
        onClick={nextStepHandler}
        isAble={isPasswordValid && isPasswordConfirmValid}
      />
    </>
  );
};

export default FindPwPage2;
