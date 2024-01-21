import React, { useState } from 'react';
import FindPwPage1 from '../../components/loginPage/FindPwPage1';
import FindPwPage2 from '../../components/loginPage/FindPwPage2';
import HeaderBar from '../../components/joinPage/HeaderBar';

const FindPwPage = () => {
  const [email, setEmail] = useState('');
  const [findPwLevel, setFindPwLevel] = useState(1); // 1, 2

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <HeaderBar text="비밀번호 재설정" />
      {findPwLevel === 1 ? (
        <FindPwPage1 handleNextStep={setFindPwLevel} setEmail={setEmail} />
      ) : findPwLevel === 2 ? (
        <FindPwPage2 handleNextStep={setFindPwLevel} email={email} />
      ) : (
        <div>오류가 발생했습니다.</div>
      )}
    </div>
  );
};

export default FindPwPage;
