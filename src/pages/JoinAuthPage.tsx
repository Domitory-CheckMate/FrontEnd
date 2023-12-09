import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from '../assets/icon/icon_search.svg';
import { ReactComponent as Close } from '../assets/icon/icon_close.svg';
import { ReactComponent as Down } from '../assets/icon/icon_down.svg';

// 모달 컴포넌트
const AuthCheckModal = ({ onClose }: { onClose: () => void }) => {
  const handleCloseModal = () => {
    onClose();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-50">
      <div
        className="absolute bg-black opacity-50 w-full h-full"
        onClick={handleCloseModal}
      ></div>
      <div className="relative mx-4 w-96 font-normal text-base text-center flex-col justify-center bg-white rounded-[27px] pb-[21px] px-[22px] pt-[27px] text-black z-50">
        <div className="bg-transparent text-black flex justify-center text-lg ">
          입력하신 인증번호가 올바르지 않습니다.
        </div>
        <button
          onClick={onClose}
          className="w-full h-[50px] mt-8 bg-primary text-white rounded-[27px]"
        >
          확인
        </button>
      </div>
    </div>
  );
};
const JoinAuthPage = () => {
  const navigate = useNavigate();

  const [school, setSchool] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNum, setAuthNum] = useState<number>(0);

  const [isSchoolValid, setIsSchoolValid] = useState<boolean>(false);
  const [isYearValid, setIsYearValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  const [isAuthNumValid, setIsAuthNumValid] = useState<boolean>(false);

  const [isAuthNumSent, setIsAuthNumSent] = useState<boolean>(false);
  const [isAuthNumSentAgain, setIsAuthNumSentAgain] = useState<boolean>(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const [leftTime, setLeftTime] = useState<string>('4:59');

  const [sentAuthNumComment, setSentAuthNumComment] =
    useState<string>('인증번호 전송');

  const sentAuthNum = () => {
    setIsAuthNumSent(true);
    setSentAuthNumComment('재전송');
  };

  const sentAuthNumAgain = () => {
    setIsAuthNumSentAgain(true);
  };

  const checkAuthNum = () => {
    if (authNum === 1) {
      setIsAuthNumValid(true);
    } else {
      setShowFailModal(true);
      console.log('인증번호가 일치하지 않습니다.');
      console.log(showFailModal);
    }
  };

  const handleCloseModal = () => {
    setShowFailModal(false);
  };

  useEffect(() => {
    setIsSchoolValid(school.length > 0);
  }, [school]);

  useEffect(() => {
    setIsYearValid(year.length > 0);
  }, [year]);

  useEffect(() => {
    setIsEmailValid(email.length > 0);
  }, [email]);

  useEffect(() => {
    setIsAuthNumValid(authNum === 1);
  }, [authNum]);

  useEffect(() => {
    setIsInputValid(isSchoolValid && isYearValid && isEmailValid);
  }, [isSchoolValid, isYearValid, isEmailValid]);

  useEffect(() => {
    if (isAuthNumSent === false) return;
    setLeftTime('4:59');
    const timer = setInterval(() => {
      setLeftTime((prevLeftTime) => {
        const [minute, second] = prevLeftTime.split(':').map(Number);

        if (minute === 0 && second === 0) {
          clearInterval(timer);

          return '0:0';
        } else if (second === 0) {
          return `${minute - 1}:59`;
        } else {
          return `${minute}:${second - 1}`;
        }
      });
    }, 1000);
    setIsAuthNumSentAgain(false);

    return () => clearInterval(timer);
  }, [isAuthNumSent, isAuthNumSentAgain]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center w-full px-4 mt-[65px] relative">
        <div className="w-1/3">
          <Close className="cursor-pointer" onClick={() => navigate(-1)} />{' '}
        </div>
        <div className="text-[18px] font-bold">학교인증</div>
        <div className="w-1/3"></div>
      </div>

      <div className="flex flex-col w-full px-4 mt-4 grow">
        <div className="leading-7 font-normal text-xl">
          체크메이트 이용을 위해
        </div>
        <div className="leading-7 font-normal text-xl">
          본인의 학교를 인증해주세요.
        </div>
        <div className="leading-5 font-normal text-base text-[#777777] mt-[10px]">
          학교 인증과정을 거치지 않으면 체크메이트
        </div>
        <div className="leading-5 font-normal text-base text-[#777777]">
          기능 이용이 제한됩니다.
        </div>
        <div className="mt-6 text-sm font-semibold">학교</div>
        <div className="w-full flex border-b border-[#CCCCCC]">
          <input
            className="w-full py-2 text-base outline-none  placeholder:text-defaultTextGray"
            type="text"
            placeholder="이름으로 찾기"
            onChange={(e) => setSchool(e.target.value)}
          />
          <div className="flex items-center justify-center mr-[8px]">
            <Search className=" " />
          </div>
        </div>
        <div className="mt-[16px] text-sm font-semibold">입학년도</div>
        <div className="w-full flex border-b border-[#CCCCCC]">
          <input
            className="w-full py-2 outline-none placeholder:text-defaultTextGray"
            type="text"
            placeholder="연도 선택"
            onChange={(e) => setYear(e.target.value)}
          />
          <div className="flex items-center justify-center mr-[8px]">
            <Down className="" />
          </div>
        </div>
        <div className="mt-[16px] text-sm font-semibold">학교 이메일</div>
        <div className="w-full flex border-b border-[#CCCCCC]">
          <input
            className="w-full py-2 outline-none placeholder:text-defaultTextGray"
            type="email"
            placeholder="예)test@gachon.ac.kr"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center justify-center mr-[8px] py-[10px]">
            <button
              className={`w-[104px] h-[35px] rounded-[27px] ${
                isInputValid
                  ? 'bg-primary text-white'
                  : 'bg-[#CBCBCC] text-white cursor-not-allowed'
              } 
              ${isAuthNumSent ? 'w-[66px]' : 'w-[104px]'}
              text-sm`}
              onClick={() => {
                if (isInputValid === true) {
                  if (isAuthNumSent === false) {
                    sentAuthNum();
                  } else {
                    sentAuthNumAgain();
                  }
                }
              }}
            >
              {sentAuthNumComment}
            </button>
          </div>
        </div>
        {isAuthNumSent === false ? (
          <div className="text-xs mt-[8px] text-[#FF6C3E]">
            학교 도메인과 연동된 이메일을입력해주세요.
          </div>
        ) : (
          <div>
            <div className="w-full flex border-b border-[#CCCCCC]">
              <input
                className="w-full py-2 outline-none placeholder:text-defaultTextGray"
                type="email"
                placeholder="인증번호 6자리"
                onChange={(e) => setAuthNum(parseInt(e.target.value))}
              />
              <div className="flex items-center justify-center mr-[8px] py-[10px] space-x-4">
                <div className="text-primary text-base">{leftTime}</div>
                <button
                  className={`w-[52px] h-[35px] rounded-[27px] ${
                    isAuthNumValid
                      ? 'bg-primary text-white'
                      : 'bg-[#CBCBCC] text-white cursor-not-allowed'
                  } text-sm`}
                  onClick={() => checkAuthNum()}
                >
                  확인
                </button>
              </div>
            </div>
            <div className="text-[10px] text-defaultTextGray mt-[16px]">
              인증번호 발송에는 시간이 소요되며 하루 최대 5회까지 전송할 수
              있습니다.
            </div>
            <div className="text-[10px] text-defaultTextGray">
              인증번호는
              <span className="text-[#c1c1c1] font-semibold ">
                입력한 이메일 주소
              </span>
              로 발송됩니다. 수신하지 못했다면 스팸함 또는 해당 이메일 서
            </div>
            <div className="text-[10px] text-defaultTextGray">
              비스의 설정을 확인해주세요.
            </div>
          </div>
        )}
      </div>

      <button
        className={`py-4 
      bg-primary text-white text-[18px] absolute rounded-full bottom-[95px] left-4 right-4`}
        onClick={() => navigate('/join/completed')}
      >
        학교 인증하기
      </button>
      <button
        className={`
      bg-white text-primary text-[18px] absolute rounded-full bottom-[48px] left-4 right-4`}
        onClick={() => navigate('/join/completed')}
      >
        건너띄기
      </button>
      {showFailModal && <AuthCheckModal onClose={handleCloseModal} />}
    </div>
  );
};

export default JoinAuthPage;
