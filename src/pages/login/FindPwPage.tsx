import React, { useState } from 'react';
import FindPwPage1 from '../../components/loginPage/FindPwPage1';
import FindPwPage2 from '../../components/loginPage/FindPwPage2';
import HeaderBar from '../../components/loginPage/HeaderBar';

const FindPwPage = () => {
  const [findPwLevel, setFindPwLevel] = useState(1); // 1, 2
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <HeaderBar text="비밀번호 찾기" />
      {findPwLevel === 1 ? (
        <FindPwPage1 handleNextStep={setFindPwLevel} />
      ) : findPwLevel === 2 ? (
        <FindPwPage2 handleNextStep={setFindPwLevel} />
      ) : (
        <div>오류가 발생했습니다.</div>
      )}
    </div>
  );
};

export default FindPwPage;
