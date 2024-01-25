import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Close } from '../../assets/icon/icon_close.svg';

import TitleInput from '../../components/writePage/TitleInput';
import IntroInput from '../../components/writePage/IntroInput';
import KeywordInput from '../../components/writePage/KeywordInput';
import CallCheckList from '../../components/writePage/CallCheckList';
import PeriodInput from '../../components/writePage/PeriodInput';
import RoomTypeInput from '../../components/writePage/RoomTypeInput';
import { useMutation } from 'react-query';
import { postNewPostApi } from '../../api/userApi';
import {
  CustomError,
  articlePostType,
  checklistApiType,
} from '../../data/type';
import DormitoryTypeInput from '../../components/writePage/DormitoryInput';

const WritePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [keyword, setKeyword] = useState('');
  const [match, setMatch] = useState('');
  const [callCheck, setCallCheck] = useState<checklistApiType>();
  const [period, setPeriod] = useState('');
  const [roomType, setRoomType] = useState('');
  const [dormitoryType, setDormitoryType] = useState('');
  const [finalArticle, setFinalArticle] = useState<articlePostType>();

  // 각 입력 컴포넌트에서 사용될 콜백 함수들
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleIntroChange = (newIntro: string) => {
    setIntro(newIntro);
  };

  const handleKeywordChange = (newKeyword: string) => {
    setKeyword(newKeyword);
  };
  const handleMatchChange = (newMatch: string) => {
    setMatch(newMatch);
  };

  const handleCallCheckChange = (newCallCheck: checklistApiType) => {
    setCallCheck(newCallCheck);
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  const handleRoomTypeChange = (newRoomType: string) => {
    setRoomType(newRoomType);
  };

  const handleDormitoryTypeChange = (newDormitoryType: string) => {
    setDormitoryType(newDormitoryType);
  };
  useEffect(() => {
    const myArticle: articlePostType = {
      title: title,
      content: intro,
      importantKey: keyword,
      similarityKey: match,
      roomType: roomType,
      dormitoryType: dormitoryType,
      endDate: period,
      checkList: callCheck as checklistApiType,
    };
    setFinalArticle(myArticle);
  }, [title, intro, keyword, callCheck, period, roomType]);

  const { mutate: tryPostArticle } = useMutation(
    () => postNewPostApi(finalArticle as articlePostType),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate(-1);
      },
      onError: (error: unknown) => {
        console.log(error);
        const customErr = error as CustomError;
        if (customErr.response?.status === 500) {
          console.log('오류가 발생하였습니다.');
        }
      },
    },
  );

  const handlePost = () => {
    // 여기에 게시글 등록 로직을 작성합니다.
    console.log('게시글 등록');
    console.log(finalArticle);
    tryPostArticle();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4">
      <div className="flex justify-between items-center w-full mt-[65px] relative mb-[48px]">
        <div className="w-1/3"></div>
        <div className="text-[18px] font-bold">룸메이트 모집</div>
        <div className="w-1/3 flex justify-end">
          <Close className="cursor-pointer" onClick={() => navigate(-1)} />{' '}
        </div>
      </div>
      <div className="grow-1 w-full scrollbar-hide overflow-y-auto ">
        <div className="grid gap-y-[25px]">
          <TitleInput title="제목" onTitleChange={handleTitleChange} />
          <IntroInput intro="한줄소개" onIntroChange={handleIntroChange} />
          <KeywordInput
            title="키워드"
            onKeywordChange={handleKeywordChange}
            onMatchChange={handleMatchChange}
          />
          <CallCheckList onCallCheckChange={handleCallCheckChange} />
          <PeriodInput onPeriodChange={handlePeriodChange} />
          <DormitoryTypeInput
            onDormitoryTypeChange={handleDormitoryTypeChange}
          />
          <RoomTypeInput onRoomTypeChange={handleRoomTypeChange} />
        </div>
      </div>

      <div className="bg-white pt-[11px] pb-[29px]">
        <button
          className="w-full h-[50px]  bg-primary text-white rounded-[27px]"
          onClick={handlePost}
        >
          {' '}
          등록하기
        </button>
      </div>
    </div>
  );
};

export default WritePage;
