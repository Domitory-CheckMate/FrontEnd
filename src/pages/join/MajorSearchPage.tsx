import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import { ReactComponent as Search } from '../../assets/icon/icon_search_gray.svg';
import { departmentType } from '../../data/type';
import { searchDepartmentApi } from '../../api/userApi';
import CompleteButton from './CompleteButton';
import MajorItem from '../../components/joinPage/MajorItem';
import { useLocation, useNavigate } from 'react-router-dom';

const MajorSearchPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { joinInfo, pwCheck } = state;
  console.log(joinInfo);
  console.log(pwCheck);
  const [major, setMajor] = useState<string>(joinInfo.major);
  const [searchText, setSearchText] = useState<string>(joinInfo.major);
  const [searchResults, setSearchResults] = useState<departmentType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (major !== '') {
      handleSearch();
    }
  }, []);

  useEffect(() => {
    joinInfo.major = major;
    console.log(joinInfo);
  }, [major]);

  const handleSearch = async () => {
    try {
      const univ = '가천대학교';
      const response = await searchDepartmentApi(univ, searchText);
      console.log(response);

      setSearchResults(response.data.data);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setErrorMessage(`오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.`);
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <HeaderBar text="학과 설정" />
      <div className="w-full grow flex flex-col px-4 mt-1.5">
        <div className="shrink-0 w-full flex justify-between items-center px-4 py-3.5 mt-1.5 mb-5 rounded-full bg-grayScale1">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="outline-none bg-transparent"
            placeholder="학과 이름을 검색해보세요."
            onKeyDown={handleKeyDown}
          />
          <Search className="cursor-pointer" onClick={handleSearch} />
        </div>
        <div className="w-full grow flex flex-col items-center justify-start">
          {
            // 검색 결과가 없을 때
            isError ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-[14px] text-grahScale3">
                  {errorMessage}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-[14px] text-grahScale3">
                  검색 결과가 없습니다.
                </div>
              </div>
            ) : (
              // 검색 결과가 있을 때
              <div className="w-full px-4 flex flex-col items-center justify-start gap-y-2.5">
                {searchResults.map((result, index) => {
                  return (
                    <MajorItem
                      department={result.department}
                      college={result.college}
                      clicked={result.department === major}
                      onClick={() => setMajor(result.department)}
                      key={index}
                    />
                  );
                })}
              </div>
            )
          }
        </div>
      </div>
      <CompleteButton
        text="등록"
        isOkToClick={major !== ''}
        onClick={() => {
          navigate('/join/info', {
            state: { joinInfo: joinInfo, pwCheck: pwCheck },
          });
        }}
      />
    </div>
  );
};

export default MajorSearchPage;
