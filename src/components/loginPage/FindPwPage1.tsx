import React, { useEffect, useState } from 'react';
import CompleteButton from './CompleteButton';
import { useMutation } from 'react-query';
import { validateEmailForPwApi } from '../../api/userApi';
import { CustomError } from '../../data/type';

const FindPwPage1 = ({
  handleNextStep,
  setEmail,
}: {
  handleNextStep: (step: number) => void;
  setEmail: (email: string) => void;
}) => {
  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [id, setId] = useState('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isInfo, setIsInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>('');
  const [sendRequest, setSendRequest] = useState(false);
  const [sendRequestAgain, setSendRequestAgain] = useState(false);
  const [originCertificationNumber, setOriginCertificationNumber] =
    useState('');
  const [certificationNumber, setCertificationNumber] = useState('');
  const [isCertified, setIsCertified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sendRequest) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      if (isCertified) {
        clearInterval(timer);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [sendRequest, isCertified]);

  const handleRequestBtnClick = () => {
    if (id === '' || emailFormat.test(id) === false) {
      setIsError(true);
      setErrorMessage('올바른 아이디를 입력해주세요.');
      return;
    }

    setSendRequest(true);
    setSendRequestAgain(false);
    trySendEmail();
  };

  const handleCertificationBtnClick = () => {
    if (
      certificationNumber === '' ||
      certificationNumber !== originCertificationNumber
    ) {
      setIsInfo(true);
      setInfoMessage('인증번호가 일치하지 않습니다.');
      return;
    }

    setIsInfo(true);
    setInfoMessage('인증이 완료되었습니다.');
    setIsCertified(true);
  };

  const handleNextBtnClick = () => {
    setEmail(id);
    handleNextStep(2);
  };

  const { mutate: trySendEmail } = useMutation(
    () => validateEmailForPwApi(id),
    {
      onSuccess: (data) => {
        console.log(data);
        setOriginCertificationNumber(data.data.data.code);
        setRemainingTime(180);
        setIsError(false);
        setSendRequestAgain(true);
      },
      onError: (error) => {
        console.log(error);
        setSendRequest(false);
        setIsError(true);
        const customErr = error as CustomError;
        if (
          customErr.response?.status === 409 ||
          customErr.response?.status === 500
        ) {
          setErrorMessage(customErr.response.data.message);
          console.log(customErr.response.data.message);
        } else {
          setErrorMessage('오류가 발생하였습니다. 다시 시도해주세요.');
        }
      },
    },
  );

  return (
    <>
      <div className="grow flex flex-col w-full items-start px-4 mt-14">
        <div className="w-full">
          <div className="w-full flex flex-col">
            <div className="flex w-full items-center">
              <input
                type="email"
                placeholder="아이디 (이메일)"
                className="grow py-[23px] outline-none bg-transparent placeholder:text-grayScale3 disabled:text-grayScale3"
                value={id}
                disabled={isCertified}
                onChange={(e) => setId(e.target.value)}
              />
              <button
                className={
                  'flex items-center justify-center text-sm px-[14px] h-9 leading-normal rounded-full text-white disabled:bg-grayScale3 break-keep whitespace-pre-wrap ' +
                  ((id != '' && !sendRequest) ||
                  (sendRequest && sendRequestAgain)
                    ? 'bg-primary'
                    : 'bg-grayScale3')
                }
                disabled={isCertified ? true : id === '' ? true : false}
                onClick={handleRequestBtnClick}
              >
                {sendRequestAgain
                  ? '재전송'
                  : sendRequest
                  ? '전송됨'
                  : '인증번호 전송'}
              </button>
            </div>
            <div className="w-full h-px bg-[#CCCCCC]" />
            {isError && (
              <div className="text-xs mt-[8px] text-[#FF6C3E]">
                {errorMessage}
              </div>
            )}
          </div>
          {sendRequestAgain && (
            <div className="w-full flex flex-col">
              <div className="flex w-full items-center">
                <input
                  type="tel"
                  placeholder="인증번호 6자리"
                  className="grow py-[23px] outline-none bg-transparent placeholder:text-grayScale3 disabled:text-grayScale3"
                  maxLength={6}
                  value={certificationNumber}
                  disabled={isCertified}
                  onChange={(e) => setCertificationNumber(e.target.value)}
                />
                <div
                  className={
                    'text-sm mr-[14px] ' +
                    (isCertified ? 'text-grayScale3' : 'text-primary')
                  }
                >
                  {Math.floor(remainingTime / 60)}:
                  {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
                </div>
                <button
                  type="button"
                  className={
                    'text-sm px-[14px] py-[9px] leading-normal rounded-full text-white ' +
                    (!isCertified && certificationNumber.length === 6
                      ? 'bg-primary'
                      : 'bg-grayScale3')
                  }
                  onClick={handleCertificationBtnClick}
                  disabled={certificationNumber.length !== 6}
                >
                  확인
                </button>
              </div>
              <div className="w-full h-px bg-[#CCCCCC]" />
              {isInfo && (
                <div className="text-xs mt-[8px] text-[#FF6C3E]">
                  {infoMessage}
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col mt-[14px] text-[10px] leading-[18px] text-grayScale3">
            <div>인증번호 발송에는 시간이 소요됩니다.</div>
            <div>
              인증번호가 문자메시지로 발송되며, 수신하지 못했다면 차단된
              메시지를 확인해주세요.
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center">
        <CompleteButton
          text="확인"
          onClick={() => handleNextBtnClick()}
          isAble={isCertified}
        />
      </div>
    </>
  );
};

export default FindPwPage1;
