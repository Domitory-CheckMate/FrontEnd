import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompleteButton from './CompleteButton';
import { ReactComponent as CheckGray } from '../../assets/icon/icon_check_gray.svg';
import { ReactComponent as CheckPrimary } from '../../assets/icon/icon_check_primary.svg';
import { useMutation } from 'react-query';
import { changePwApi } from '../../api/userApi';
import { CustomError } from '../../data/type';

const FindPwPage2 = ({
  handleNextStep,
  email,
}: {
  handleNextStep: (step: number) => void;
  email: string;
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    if (!isPasswordValid) {
      setIsError(true);
      setErrorMessage('올바른 비밀번호를 입력해주세요.');
      return;
    }

    tryChangePw();
  };

  const { mutate: tryChangePw } = useMutation(
    () => changePwApi(email, password),
    {
      onSuccess: (data) => {
        console.log(data);
        console.log('비밀번호 변경 성공');
        navigate('/login');
        handleNextStep(1);
      },
      onError: (error: unknown) => {
        console.log(error);
        setIsError(true);
        const customErr = error as CustomError;
        if (customErr.response?.status === 404) {
          setErrorMessage(customErr.response.data.message);
        } else if (customErr.response?.status === 500) {
          console.log('서버 내부 오류');
          setErrorMessage('오류가 발생했습니다. 다시 시도해주세요.');
        } else {
          console.log('원인 불명확');
          setErrorMessage('오류가 발생하였습니다. 다시 시도해주세요.');
        }
      },
    },
  );

  return (
    <>
      <div className="grow w-full px-4 flex flex-col items-start mt-[35px] whitespace-pre-line">
        <div className="w-full flex text-[20px] leading-8 ">{`체크메이트의\n비밀번호를 재설정합니다.`}</div>
        <div className="w-full flex flex-col mt-7">
          <div>비밀번호</div>
          <div className="w-full flex flex-col items-start">
            <div className="flex w-full items-center gap-x-10">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="8~20자 대소문자 영문, 숫자, 특수문자"
                className="grow py-[23px] outline-none bg-transparent placeholder:text-[#D0D0D0]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={
                  'text-sm mr-[9px] ' +
                  (isPasswordVisible ? 'text-primary' : 'text-grayScale3')
                }
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                보기
              </div>
            </div>
            <div className="w-full h border border-solid border-dividerGray" />
            <div className="flex gap-x-2 items-center mt-[10px] text-[#CBCBCC]">
              <div
                className={
                  'flex gap-x-0.5 items-center' +
                  (hasUppercase && hasLowercase
                    ? ' text-primary'
                    : ' text-[#CBCBCC]')
                }
              >
                <div>대소문자</div>
                {hasUppercase ? <CheckPrimary /> : <CheckGray />}
              </div>
              <div
                className={
                  'flex gap-x-0.5 items-center' +
                  (hasDigit ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>숫자</div>
                {hasDigit ? <CheckPrimary /> : <CheckGray />}
              </div>
              <div
                className={
                  'flex gap-x-0.5 items-center' +
                  (hasSpecialCharacter ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>특수문자</div>
                {hasSpecialCharacter ? <CheckPrimary /> : <CheckGray />}
              </div>
              <div
                className={
                  'flex gap-x-0.5 items-center' +
                  (isLengthValid ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>8~20자 이내</div>
                {isLengthValid ? <CheckPrimary /> : <CheckGray />}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            <div className="flex w-full items-center gap-x-10">
              <input
                type={isPasswordConfirmVisible ? 'text' : 'password'}
                placeholder="비밀번호 확인"
                className="grow py-[23px] outline-none bg-transparent placeholder:text-[#D0D0D0]"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <div
                className={
                  'text-sm mr-[9px] ' +
                  (isPasswordConfirmVisible
                    ? 'text-primary'
                    : 'text-grayScale3')
                }
                onClick={() =>
                  setIsPasswordConfirmVisible(!isPasswordConfirmVisible)
                }
              >
                보기
              </div>
            </div>
            <div className="w-full h border border-solid border-dividerGray" />
            <div className="flex gap-x-2 items-center mt-[10px]">
              <div
                className={
                  'flex gap-x-0.5 items-center' +
                  (isPasswordConfirmValid ? ' text-primary' : ' text-[#CBCBCC]')
                }
              >
                <div>비밀번호 일치</div>
                {isPasswordConfirmValid ? <CheckPrimary /> : <CheckGray />}
              </div>
            </div>
          </div>
          {isError && (
            <div className="text-xs mt-[8px] text-[#FF6C3E]">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex items-center">
        <CompleteButton
          text="확인"
          onClick={nextStepHandler}
          isAble={isPasswordValid && isPasswordConfirmValid}
        />
      </div>
    </>
  );
};

export default FindPwPage2;
