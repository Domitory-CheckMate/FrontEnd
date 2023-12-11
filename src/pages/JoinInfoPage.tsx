import React from 'react';
import { useState, useEffect } from 'react';
import HeaderBar from '../components/joinPage/HeaderBar';
import NextButton from '../components/joinPage/NextButton';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Check } from '../assets/icon/icon_check.svg';

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

const CheckLine = ({ text, check }: { text: string; check: boolean }) => {
  return (
    <div className="flex items-center">
      <div className={`${check ? 'text-primary' : ''}`}>{text}</div>
      <Check className={`${check ? 'text-primary' : ''}`} />
    </div>
  );
};

const JoinInfoPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // const [nameComment, setNameComment] =
  //   useState<string>('올바른 이름을 입력해주세요');
  const emailContentArray = [
    '이미 가입된 이메일입니다.',
    '학교 도메인과 연동된 이메일을 입 력해주세요.',
  ];
  const [emailComment, setEmailComment] = useState<string>(
    emailContentArray[0],
  );

  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);

  // 비밀번호 조건
  const [isCapitalAndSmall, setIsCapitalAndSmall] = useState<boolean>(false);

  const [isNumber, setIsNumber] = useState<boolean>(false);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [isLength, setIsLength] = useState<boolean>(false);

  const [isCanBeNext, setIsCanBeNext] = useState(true);

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isConfirmedPasswordShown, setIsConfirmedPasswordShown] =
    useState<boolean>(false);

  const [authNum, setAuthNum] = useState<number>(0);

  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  const [isAuthNumValid, setIsAuthNumValid] = useState<boolean>(false);

  const [isAuthNumSent, setIsAuthNumSent] = useState<boolean>(false);
  const [isAuthNumSentAgain, setIsAuthNumSentAgain] = useState<boolean>(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const [leftTime, setLeftTime] = useState<string>('4:59');

  const [sentAuthNumComment, setSentAuthNumComment] =
    useState<string>('인증번호 전송');

  // Update event handlers for password visibility toggling
  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setIsConfirmedPasswordShown(!isConfirmedPasswordShown);
  };

  // Use isPasswordShown and isConfirmedPasswordShown to determine input type
  const passwordInputType = isPasswordShown ? 'text' : 'password';
  const confirmedPasswordInputType = isConfirmedPasswordShown
    ? 'text'
    : 'password';

  const sentAuthNum = () => {
    setIsAuthNumSent(true);
    setSentAuthNumComment('재전송');
  };

  const sentAuthNumAgain = () => {
    setIsAuthNumSentAgain(true);
  };

  const checkAuthNum = () => {
    if (authNum > 0) {
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
    // 비밀번호 확인
    if (password.length > 0) {
      // 대소문자 확인
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
        setIsCapitalAndSmall(true);
      } else {
        setIsCapitalAndSmall(false);
      }

      // 숫자 확인
      if (/[0-9]/.test(password)) {
        setIsNumber(true);
      } else {
        setIsNumber(false);
      }

      // 특수문자 확인
      if (/[~!@#$%^&*()_+|<>?:{}]/.test(password)) {
        setIsSpecial(true);
      } else {
        setIsSpecial(false);
      }

      // 길이 확인
      if (password.length >= 8 && password.length <= 20) {
        setIsLength(true);
      } else {
        setIsLength(false);
      }

      setIsPasswordValid(
        isCapitalAndSmall && isNumber && isSpecial && isLength,
      );
    } else {
      setIsPasswordValid(false);
    }

    // 비밀번호 일치 확인
    if (password === confirmedPassword && confirmedPassword.length > 0) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }

    // 모든 조건이 만족할 때 다음 버튼 활성화
    if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
      setIsCanBeNext(true);
    } else {
      setIsCanBeNext(false);
    }
  }, [password, confirmedPassword, isPasswordMatch]);

  useEffect(() => {
    setIsNameValid(name.length > 0);
  }, [name]);

  useEffect(() => {
    setIsEmailValid(email.length > 0);
    // 이메일 확인
    if (email.length > 0) {
      setEmailComment('');
      setIsEmailValid(true);
    } else {
      setEmailComment('이미 가입된 이메일입니다.');
      setIsEmailValid(false);
    }
  }, [email]);

  useEffect(() => {
    setIsAuthNumValid(authNum === 1);
  }, [authNum]);

  useEffect(() => {
    setIsInputValid(isNameValid && isEmailValid);
  }, [isNameValid, isEmailValid]);

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

  useEffect(() => {
    // 전체 확인
    if (isInputValid && isAuthNumValid && isPasswordMatch) {
      setIsCanBeNext(true);
    } else {
      setIsCanBeNext(false);
    }
  }, [isInputValid, isAuthNumValid, isPasswordMatch]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <HeaderBar text="회원가입" />
      <div className="w-full px-4 flex flex-col gap-y-[16px] mt-10 text-sm">
        <div className="flex flex-col">
          <div className="font-semibold text-sm">이름</div>
          <input
            className="py-4 text-base outline-none border-b border-[#CCCCCC]  placeholder:text-defaultTextGray"
            type="text"
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <div className="mt-[0px] text-sm font-semibold">
            아이디(학교 이메일)
          </div>
          <div className="w-full flex border-b border-[#CCCCCC]">
            <input
              className="w-full py-4 outline-none text-base placeholder:text-defaultTextGray"
              type="email"
              placeholder={
                isAuthNumSent ? '학교 이메일' : '예)test@gachon.ac.kr'
              }
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
              {emailComment}
            </div>
          ) : (
            <div>
              <div className="w-full flex border-b border-[#CCCCCC]">
                <input
                  className="w-full py-4 outline-none text-base placeholder:text-defaultTextGray"
                  type="email"
                  placeholder="인증번호 6자리"
                  onChange={(e) => setAuthNum(parseInt(e.target.value))}
                />
                <div className="flex items-center justify-center mr-[8px] py-[10px] space-x-4">
                  <div className="text-primary text-base">{leftTime}</div>
                  <button
                    className={`w-[52px] h-[35px] rounded-[27px] ${
                      authNum > 0
                        ? 'bg-primary text-white'
                        : 'bg-[#CBCBCC] text-white cursor-not-allowed'
                    } text-sm`}
                    onClick={() => checkAuthNum()}
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-sm ">비밀번호</div>
          <div className="w-full flex border-b border-[#CCCCCC]">
            <input
              className="w-full py-4 outline-none text-base placeholder:text-defaultTextGray"
              type={passwordInputType}
              placeholder="8~20자 대소문자 영문, 숫자, 특수문자"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="flex items-center justify-center mr-[17px] w-[30px] cursor-pointer text-primary"
              onClick={togglePasswordVisibility}
            >
              보기
            </div>
          </div>
          <div className="text-xs mt-[9px] flex items-center text-[#CCCCCC] space-x-2">
            <CheckLine text="대소문자" check={isCapitalAndSmall} />{' '}
            <CheckLine text="숫자" check={isNumber} />
            <CheckLine text="특수문자" check={isSpecial} />
            <CheckLine text="8-20자 이내" check={isLength} />
          </div>
          <div className="w-full flex border-b border-[#CCCCCC]">
            <input
              className="w-full py-4 outline-none text-base placeholder:text-defaultTextGray"
              type={confirmedPasswordInputType}
              placeholder="비밀번호 확인"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
            <div
              className="flex items-center justify-center mr-[17px] w-[30px] cursor-pointer text-primary"
              onClick={toggleConfirmedPasswordVisibility}
            >
              보기
            </div>
          </div>
          <div className="text-xs mt-[9px] text-[#CCCCCC]">
            <CheckLine text="비밀번호 일치" check={isPasswordMatch} />
          </div>
        </div>
      </div>

      {isAuthNumSent === false ? null : (
        <div className="w-full px-4 absolute bottom-[124px]">
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
      <NextButton
        text="회원가입"
        isCanBeNext={isCanBeNext}
        onClick={() => navigate('/join/completed')}
      />
      {showFailModal && <AuthCheckModal onClose={handleCloseModal} />}
    </div>
  );
};

export default JoinInfoPage;
