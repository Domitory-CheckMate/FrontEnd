import React, { useEffect, useRef, useState } from 'react';
import CompleteButton from './CompleteButton';

const FindPwPage1 = ({
  handleNextStep,
}: {
  handleNextStep: (step: number) => void;
}) => {
  const [id, setId] = useState('');
  const [birthday, setBirthday] = useState('');
  const [backNumber, setBackNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState('');
  const [isCertified, setIsCertified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);

  const idRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const backNumberRef = useRef<HTMLInputElement>(null);

  const isOkToSendRequest =
    id !== '' && birthday !== '' && backNumber !== '' && phoneNumber !== '';
  const isOkToCheckVerificationNumber = certificationNumber !== '';

  const handleRequestBtnClick = () => {
    if (id === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (birthday === '') {
      alert('생년월일을 입력해주세요.');
      return;
    }
    if (backNumber === '') {
      alert('성별을 입력해주세요.');
      return;
    }
    if (phoneNumber === '') {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }

    setSendRequest(true);
    setRemainingTime(180);
  };

  const handleCertificationBtnClick = () => {
    if (certificationNumber === '') {
      alert('인증번호를 입력해주세요.');
      return;
    }

    setIsCertified(true);
  };

  useEffect(() => {
    idRef.current?.focus();
  }, [id]);

  useEffect(() => {
    if (birthday.length === 6 && backNumberRef.current !== null) {
      backNumberRef.current.focus();
    }
  }, [birthday]);

  useEffect(() => {
    if (
      birthday.length > 1 &&
      backNumber.length < 1 &&
      birthdayRef.current !== null
    ) {
      birthdayRef.current.focus();
    }
  }, [backNumber]);

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

  return (
    <>
      <div className="grow flex flex-col w-full items-start px-4 mt-14">
        <input
          type="text"
          placeholder="아이디(이메일)"
          className="w-full py-[23px] outline-none border-b border-[#CCCCCC] placeholder:text-grayScale3"
          value={id}
          ref={idRef}
          onChange={(e) => setId(e.target.value)}
        />
        <div className="w-full flex flex-col">
          <div className="flex w-full items-center justify-between mt-[22px]">
            <input
              type="tel"
              placeholder="생년월일(ex:900101)"
              className="py-[23px] px-0 outline-none bg-transparent max-w-[180px] placeholder:text-grayScale3"
              maxLength={6}
              ref={birthdayRef}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <div className="grow flex items-center justify-center">-</div>
            <div className="grow py-[23px] flex gap-x-2 items-center px-2 max-w-[180px]">
              <div className="w-2 h-2 flex items-center justify-center relative">
                <input
                  className="w-full h-full outline-none bg-transparent absolute top-0 left-0 caret-transparent"
                  type="password"
                  ref={backNumberRef}
                  maxLength={1}
                  value={backNumber}
                  onChange={(e) => setBackNumber(e.target.value)}
                />
                {backNumber.length !== 1 ? (
                  <div className="w-2 h-2 border border-solid border-black rounded-full " />
                ) : (
                  <div className="w-2 h-2 bg-[#000000] rounded-full" />
                )}
              </div>
              <div className="w-2 h-2 bg-[#000000] rounded-full" />
              <div className="w-2 h-2 bg-[#000000] rounded-full" />
              <div className="w-2 h-2 bg-[#000000] rounded-full" />
              <div className="w-2 h-2 bg-[#000000] rounded-full" />
              <div className="w-2 h-2 bg-[#000000] rounded-full" />
              <div className="w-2 h-2 bg-[#000000] rounded-full" />
            </div>
          </div>
          <div className="w-full h-px bg-[#CCCCCC]" />
        </div>
        <div className="mt-[22px] w-full">
          <div className="w-full flex flex-col">
            <div className="flex w-full items-center">
              <input
                type="tel"
                placeholder="휴대폰 번호 (-제외)"
                className="grow py-[23px] outline-none bg-transparent placeholder:text-grayScale3"
                maxLength={11}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                className={
                  'flex items-center justify-center text-sm px-[14px] h-9 leading-normal rounded-full text-white ' +
                  (isOkToSendRequest ? 'bg-primary' : 'bg-grayScale3')
                }
                onClick={handleRequestBtnClick}
              >
                {sendRequest ? '재전송' : '인증번호 전송'}
              </button>
            </div>
            <div className="w-full h-px bg-[#CCCCCC]" />
          </div>
          {sendRequest && (
            <div className="w-full flex flex-col">
              <div className="flex w-full items-center">
                <input
                  type="tel"
                  placeholder="인증번호 6자리"
                  className="grow py-[23px] outline-none bg-transparent placeholder:text-grayScale3"
                  maxLength={11}
                  value={certificationNumber}
                  onChange={(e) => setCertificationNumber(e.target.value)}
                />
                <div className="text-sm text-primary mr-[14px]">
                  {Math.floor(remainingTime / 60)}:
                  {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
                </div>
                <button
                  type="button"
                  className={
                    'text-sm px-[14px] py-[9px] leading-normal rounded-full text-white ' +
                    (isOkToCheckVerificationNumber
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
          onClick={() => handleNextStep(2)}
          isAble={isCertified}
        />
      </div>
    </>
  );
};

export default FindPwPage1;
