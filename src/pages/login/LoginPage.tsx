import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo/logo_text_black.svg';
import PrimaryFillButton from '../../components/loginPage/PrimaryFillButton';
import PrimaryStrokeButton from '../../components/loginPage/PrimaryStrokeButton';
import { useMutation } from 'react-query';
import { loginApi } from '../../api/userApi';
import {
  setAccessToken,
  setMemberId,
  setRefreshToken,
} from '../../api/manageLocalStorage';
import { CustomError } from '../../data/type';
import { useSetRecoilState } from 'recoil';
import { memberIdState, myEmailState } from '../../data/atoms';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<'ERROR' | 'ID' | 'PW'>('ERROR');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const setRecoilMemberId = useSetRecoilState(memberIdState);
  const setRecoilMyEmail = useSetRecoilState(myEmailState);

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [email, pw]);

  const { mutate: tryLogin } = useMutation(() => loginApi(email, pw), {
    onSuccess: (data) => {
      console.log(data);
      setMemberId(data.data.data.memberId.toString());
      setRecoilMemberId(data.data.data.memberId);
      setRecoilMyEmail(data.data.data.email);

      setAccessToken(data.data.data.accessToken);
      setRefreshToken(data.data.data.refreshToken);
      navigate('/main');
    },
    onError: (error: unknown) => {
      console.log(error);
      setIsError(true);
      const customErr = error as CustomError;
      if (customErr.response?.status === 401) {
        console.log('비밀번호 에러');
        setErrorType('PW');
        setErrorMessage(customErr.response.data.message);
      } else if (customErr.response?.status === 404) {
        console.log('아이디 에러');
        setErrorType('ID');
        setErrorMessage(customErr.response.data.message);
      } else {
        console.log('오류가 발생하였습니다.');
        setErrorType('ERROR');
        setErrorMessage('오류가 발생하였습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleLoginClick = () => {
    tryLogin();
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Logo className="mt-24" />
      <div className="w-full grow flex flex-col items-center justify-center">
        <div className="w-full px-4 flex flex-col gap-y-8 text-sm">
          <div className="flex flex-col">
            <div className="font-semibold">아이디</div>
            <input
              className="py-3 outline-none border-b border-[#CCCCCC] placeholder:text-grayScale3"
              type="text"
              placeholder="예)checkmate@checkmate.co.kr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isError && errorType === 'ID' && (
              <div className="text-xs mt-[8px] text-primary">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">비밀번호</div>
            <input
              className="py-3 outline-none border-b border-grayScale3 placeholder:text-grayScale3"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />

            <div className="text-xs h-[12px] mt-[8px] text-primary">
              {isError && errorType !== 'ID' ? errorMessage : ' '}
            </div>
          </div>
        </div>
        <div className="w-full px-4">
          <PrimaryFillButton text="로그인" onClick={() => handleLoginClick()} />
          <PrimaryStrokeButton
            text="회원가입"
            onClick={() => navigate('/join')}
          />
          <div
            className="w-full flex items-center mt-[31px] justify-center cursor-pointer text-sm"
            onClick={() => navigate('/login/pw')}
          >
            비밀번호 찾기
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-[30px] mb-[36px] text-xs text-grayScale5 leading-3 font-medium">
        <div>로그인하시면 아래 내용에 동의하는 것으로 간주됩니다.</div>
        <div className="mt-4">
          <span>개인정보처리방침</span>
          <span className="mx-7" />
          <span>이용약관</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
