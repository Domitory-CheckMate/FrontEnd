import React, { useEffect, useState } from 'react';
import CompleteButton from '../../components/loginPage/CompleteButton';

const FindIdPage1 = ({
  handleNextStep,
}: {
  handleNextStep: (step: number) => void;
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState('');
  const [isCertified, setIsCertified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);

  const handleRequestBtnClick = () => {
    if (name === '') {
      alert('이름을 입력해주세요.');
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
          placeholder="이름"
          className="w-full py-[23px] outline-none border-b border-[#CCCCCC]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="mt-[22px] w-full">
          <div className="w-full flex flex-col">
            <div className="flex w-full items-center">
              <input
                type="tel"
                placeholder="휴대폰 번호 (-제외)"
                className="grow py-[23px] outline-none bg-transparent"
                maxLength={11}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                type="button"
                className="text-sm w-[104px] h-9 leading-normal rounded-full bg-[#CBCBCC] text-white"
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
                  className="grow py-[23px] outline-none bg-transparent"
                  maxLength={11}
                  value={certificationNumber}
                  onChange={(e) => setCertificationNumber(e.target.value)}
                />
                <div className="text-sm text-primary mr-1">
                  {Math.floor(remainingTime / 60)}:
                  {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
                </div>
                <button
                  type="button"
                  className="text-sm px-[14px] py-[9px] leading-normal rounded-full bg-[#CBCBCC] text-white"
                  onClick={handleCertificationBtnClick}
                  disabled={certificationNumber.length !== 6}
                >
                  확인
                </button>
              </div>
              <div className="w-full h-px bg-[#CCCCCC]" />
            </div>
          )}
          <div className="flex flex-col mt-[14px] text-[10px] leading-[18px] text-[#D0D0D0]">
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
          onClick={() => {
            handleNextStep(2);
          }}
          isAble={isCertified}
        />
      </div>
    </>
  );
};

export default FindIdPage1;
