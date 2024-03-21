import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Close } from '../../assets/icon/icon_close.svg';
import {
  convertArticleKeywordToNum,
  convertMatchToNum,
  convertDormitoryToNum,
  convertRoomToNum,
  dormitoryType,
} from '../../data/type';

import TitleInput from '../../components/writePage/TitleInput';
import IntroInput from '../../components/writePage/IntroInput';
import KeywordInput from '../../components/writePage/KeywordInput';
import CallCheckList from '../../components/writePage/CallCheckList';
import PeriodInput from '../../components/writePage/PeriodInput';
import RoomTypeInput from '../../components/writePage/RoomTypeInput';
import { useMutation } from 'react-query';
import { patchPostApi } from '../../api/userApi';
import {
  CustomError,
  articlePostType,
  checklistApiType,
} from '../../data/type';
import DormitoryTypeInput from '../../components/writePage/DormitoryInput';
import { useLocation } from 'react-router-dom';

const ModifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const originalArticle = location.state.article;
  const postId = location.state.postId;

  const [title, setTitle] = useState(originalArticle.title);
  const [intro, setIntro] = useState(originalArticle.content);
  const [keyword, setKeyword] = useState(
    convertArticleKeywordToNum[originalArticle.importantKey],
  );
  const [match, setMatch] = useState(
    convertMatchToNum[originalArticle.similarityKey],
  );
  const [callCheck, setCallCheck] = useState<checklistApiType>(
    originalArticle.checkList,
  );
  const [period, setPeriod] = useState(originalArticle.endDate);

  const [roomType, setRoomType] = useState(
    convertRoomToNum[originalArticle.roomType],
  );
  const [dormitoryType, setDormitoryType] = useState(
    convertDormitoryToNum[originalArticle.dormitoryType as dormitoryType],
  );

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
    console.log(newPeriod);
  };

  const handleRoomTypeChange = (newRoomType: string) => {
    setRoomType(newRoomType);
  };

  const handleDormitoryTypeChange = (newDormitoryType: string) => {
    setDormitoryType(newDormitoryType);
  };
  useEffect(() => {
    setFinalArticle((prev) => {
      return {
        ...prev,
        title: title,
        content: intro,
        importantKey: keyword,
        similarityKey: match,
        roomType: roomType,
        dormitoryType: dormitoryType,
        endDate: period,
        checkList: callCheck as checklistApiType,
      };
    });
  }, [title, intro, keyword, callCheck, period, roomType, dormitoryType]);

  const { mutate: tryPatchArticle } = useMutation(
    () => patchPostApi(postId, finalArticle as articlePostType),
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

  const handlePostModify = () => {
    // 여기에 게시글 등록 로직을 작성합니다.
    console.log('게시글 수정');
    console.log(finalArticle);
    tryPatchArticle();
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
          <TitleInput
            title="제목"
            onTitleChange={handleTitleChange}
            defaultValue={title}
          />
          <IntroInput
            intro="한줄소개"
            onIntroChange={handleIntroChange}
            defaultValue={intro}
          />
          <KeywordInput
            title="키워드"
            onKeywordChange={handleKeywordChange}
            onMatchChange={handleMatchChange}
            defaultKeyword={keyword}
            defaultMatch={match}
          />
          <CallCheckList
            onCallCheckChange={handleCallCheckChange}
            defaultBool={true}
          />
          <PeriodInput
            onPeriodChange={handlePeriodChange}
            defaultValue={period}
          />
          <DormitoryTypeInput
            onDormitoryTypeChange={handleDormitoryTypeChange}
            defaultDormitoryType={dormitoryType}
          />
          <RoomTypeInput
            onRoomTypeChange={handleRoomTypeChange}
            defaultRoomType={roomType}
          />
        </div>
      </div>

      <div className="bg-white pt-[11px] pb-[29px]">
        <button
          className="w-full h-[50px]  bg-primary text-white rounded-[27px]"
          onClick={handlePostModify}
        >
          {' '}
          수정완료
        </button>
      </div>
    </div>
  );
};

export default ModifyPage;
