import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';

import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/myPage/BottomNav';
import { ReactComponent as Settings } from '../../assets/icon/icon_settings.svg';
import { ReactComponent as Profile0 } from '../../assets/illust/character_blue.svg';
import { ReactComponent as Profile1 } from '../../assets/illust/character_red.svg';
import { ReactComponent as Profile2 } from '../../assets/illust/character_yellow.svg';
import { ReactComponent as SmallNext } from '../../assets/icon/icon_next_small.svg';
import { ReactComponent as Up } from '../../assets/icon/icon_up_mypage.svg';
import { ReactComponent as Edit } from '../../assets/icon/icon_edit.svg';
import { ReactComponent as Down } from '../../assets/icon/icon_down_mypage.svg';
import { ReactComponent as Checklist } from '../../assets/icon/icon_checklist.svg';
import { ReactComponent as ModalLine } from '../../assets/icon/icon_modal_line.svg';
import {
  editProfileImg,
  getMyInfoApi,
  getChecklistApi,
} from '../../api/userApi';

import { CustomError } from '../../data/type';

const CheckBlock = ({ emoji, content }: { emoji: string; content: string }) => {
  const navigate = useNavigate();

  return (
    <div
      className="text-[10px] text-center flex py-2 px-4 text-black rounded-[19px] bg-[#FFE2D8] cursor-pointer"
      onClick={() => {
        navigate(`/checklist`);
      }}
    >
      {emoji + ' ' + content}
    </div>
  );
};

const MyCheckList = () => {
  const { data, error, isLoading } = useQuery(
    'getChecklistInfo',
    getChecklistApi,
  );
  const [cleanType, setCleanType] = useState('');
  const [drinkType, setDrinkType] = useState('');
  const [homeType, setHomeType] = useState('');
  const [lifePatternType, setLifePatternType] = useState('');
  const [noiseType, setNoiseType] = useState('');
  const [noiseCallType, setCallType] = useState('');
  const [noiseEarPhoneType, setEarphoneType] = useState('');
  const [smokeType, setSmokeType] = useState('');
  const [sleepGridingType, setSleepGridingType] = useState('');
  const [sleepSnoreType, setSleepSnoreType] = useState('');
  const [sleepTalkingType, setSleepTalkingType] = useState('');
  const [sleepTurningType, setSleepTurningType] = useState('');
  const [sleepType, setSleepType] = useState('');

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      // 여기에서 데이터 처리 로직을 추가할 수 있습니다.

      // data 객체 내에서 필요한 정보 추출
      const {
        cleanType,
        drinkType,
        homeType,
        lifePatterType,
        callType,
        earPhoneType,
        sleepGridingType,
        sleepSnoreType,
        sleepTalkingType,
        sleepTurningType,
        smokeType,
      } = data.data.data;
      // state 업데이트
      setCleanType(cleanType);
      setDrinkType(drinkType);
      setHomeType(homeType);
      setLifePatternType(lifePatterType);
      setSmokeType(smokeType);

      // 초기화
      let sleepType = '';

      // 각 값이 boolean일 때
      if (
        !sleepGridingType &&
        !sleepSnoreType &&
        !sleepTalkingType &&
        !sleepTurningType
      ) {
        sleepType = '상관없음';
      }

      // 각 값이 문자열일 때
      if (
        typeof sleepGridingType === 'string' &&
        sleepGridingType !== 'false'
      ) {
        sleepType += sleepGridingType;
      }
      if (typeof sleepSnoreType === 'string' && sleepSnoreType !== 'false') {
        sleepType += (sleepType ? ', ' : '') + sleepSnoreType;
      }
      if (
        typeof sleepTalkingType === 'string' &&
        sleepTalkingType !== 'false'
      ) {
        sleepType += (sleepType ? ', ' : '') + sleepTalkingType;
      }
      if (
        typeof sleepTurningType === 'string' &&
        sleepTurningType !== 'false'
      ) {
        sleepType += (sleepType ? ', ' : '') + sleepTurningType;
      }

      // 결과 사용
      setSleepType(sleepType);

      var noiseCall;
      if (callType === '1') {
        noiseCall = '통화는 밖에서';
      } else if (callType === '2') {
        noiseCall = '전화는 짧게';
      } else if (callType === '3') {
        noiseCall = '통화는 자유롭게';
      } else {
        console.log(noiseCallType);
      }

      var noiseEarPhone;

      if (earPhoneType === '1') {
        noiseEarPhone = '이어폰 필수';
      } else if (earPhoneType === '2') {
        noiseEarPhone = '이어폰 상관 없이';
      } else {
        console.log(noiseEarPhoneType);
      }

      setNoiseType(noiseCall + ', ' + noiseEarPhone);
    } else {
    }

    if (error) {
      console.error('Error:', error);
      const customErr = error as CustomError;
      if (customErr.response?.status === 500) {
        console.log('오류가 발생하였습니다.');
      }
    }
  }, [data, error]);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex gap-[8px]">
        {smokeType == '비흡연자 선호' ? (
          <CheckBlock emoji="🚭" content={smokeType} />
        ) : (
          <CheckBlock emoji="🚬" content={smokeType} />
        )}{' '}
        {lifePatternType == '아침형 인간' ? (
          <CheckBlock emoji="☀️" content={lifePatternType} />
        ) : (
          <CheckBlock emoji="🌙" content={lifePatternType} />
        )}
        <CheckBlock emoji="🧽" content={cleanType} />
      </div>
      <div className="flex gap-[8px]">
        <CheckBlock emoji="😴" content={sleepType} />
        <CheckBlock emoji="🍺" content={drinkType} />
        <CheckBlock emoji="🏠" content={homeType} />
      </div>{' '}
      <div className="flex gap-[8px]">
        <CheckBlock emoji="🗣️" content={noiseType} />
      </div>
    </div>
  );
};

// 모달 컴포넌트
const ChangeProfileModal = ({ onClose }: { onClose: () => void }) => {
  const [modalBottom, setModalBottom] = useState<string>('[-352px]');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileIndex, setProfileIndex] = useState<number>(0);

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    setModalBottom(() => {
      return '[351px]';
    });
  }, [isModalOpen]);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const { mutate: tryEdit } = useMutation(
    () => editProfileImg('PROFILE_' + (profileIndex + 1)),
    {
      onSuccess: (data) => {
        console.log(data);

        onClose();
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

  const changeProfile = () => {
    // 프로필 변경 API 호출
    tryEdit();

    // 프로필 변경 실패 시
    // alert('프로필 변경에 실패했습니다.');
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 flex items-end justify-center z-50`}
    >
      <div
        className="absolute bg-modalBackground w-full h-full"
        onClick={handleCloseModal}
      ></div>
      <div
        className={`relative w-full h-[352px] font-semibold text-lg text-center flex-col justify-center bg-white rounded-[28px] pb-[93px] px-[16px] pt-[13px] text-black z-50 transition-all duration-500 ease-in-out bottom-${modalBottom}`}
      >
        <div className="w-full flex justify-center items-center">
          <ModalLine />
        </div>

        <div className="mt-[31px] bg-transparent text-black flex justify-center text-lg ">
          프로필 캐릭터 바꾸기
        </div>
        <div className="flex justify-evenly mt-[27px] grow">
          <div
            className={`rounded-[28px] border-[1px] w-[73px] h-[73px] bg-[#FDD678] flex items-center justify-center  ${
              profileIndex === 0
                ? 'border-primary'
                : 'opacity-70 border-transparent'
            }`}
            onClick={() => setProfileIndex(0)}
          >
            <div className=" flex items-enter justify-center">
              <Profile0 />
            </div>
          </div>
          <div
            className={`rounded-[28px] border-[1px] w-[73px] h-[73px] bg-[#99A2E9] flex items-center justify-center ${
              profileIndex === 1
                ? 'border-[#FDD678]'
                : 'opacity-70 border-transparent'
            }`}
            onClick={() => setProfileIndex(1)}
          >
            <div className=" flex items-enter justify-center">
              <Profile1 />
            </div>
          </div>
          <div
            className={`rounded-[28px] border-[1px] w-[73px] h-[73px] bg-primary  flex items-center justify-center ${
              profileIndex === 2
                ? 'border-[#99A2E9]'
                : 'opacity-70 border-transparent'
            }`}
            onClick={() => setProfileIndex(2)}
          >
            <div className=" flex items-center justify-center">
              <Profile2 />
            </div>
          </div>
        </div>
        <button
          onClick={changeProfile}
          className="w-full h-[54px] mt-8 bg-primary text-white rounded-[27px]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

const MyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState<string>('');
  const [name, setName] = useState<string>('홍길동');
  const [major, setMajor] = useState<string>('소프트웨어학과');
  const [gender, setGender] = useState<string>('여자');
  const [mbti, setMbti] = useState<string>('ISFP');
  const { data, error, isLoading } = useQuery('getMyInfo', getMyInfoApi);

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      // 여기에서 데이터 처리 로직을 추가할 수 있습니다.
      // data 객체 내에서 필요한 정보 추출
      const { profileImg, name, major, gender, mbti } = data.data.data;

      // state 업데이트
      setProfileImg(profileImg);
      setName(name);
      setMajor(major);
      setGender(gender);
      setMbti(mbti.toUpperCase());
    }

    if (error) {
      console.error('Error:', error);
      const customErr = error as CustomError;
      if (customErr.response?.status === 500) {
        console.log('오류가 발생하였습니다.');
      }
    }
  }, [data, error, showModal]);

  const [isChecklistShow, setIsChecklistShow] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full grow flex-col items-center overflow-y-auto scrollbar-hide">
        <div className="px-4 mt-[56px] w-full flex justify-end">
          <div className="w-[19px] h-[19px]">
            <Settings />
          </div>
        </div>
        <div className="p-4 flex mt-[0px] w-full justify-start gap-x-[24px]">
          <div
            className="rounded-[28px] bg-[#FDD678]
        "
            onClick={() => setShowModal(true)}
          >
            <div className="w-[73px] h-[73px]">
              <img src={profileImg}></img>
            </div>
          </div>
          <div className="flex-col flex gap-y-[7px] mt-[4px]">
            <div className="text-black text-[24px] font-bold">{name}</div>
            <div className="rounded-[27px] px-[14px] py-[6px] flex items-center gap-x-[6px] align-center bg-primary text-white text-xs">
              {major}・{gender}・{mbti}
            </div>
          </div>
        </div>

        <div className="mt-[0px] border-t border-[#F7F7F7] py-4 flex-col w-full">
          <div
            className="pl-4 h-16 flex w-full items-center"
            onClick={() => setIsChecklistShow(!isChecklistShow)}
          >
            <div className="w-[25px] h-[25px]">
              <Checklist />
            </div>
            <div
              className="grow ml-[12px]  items-center flex text-base text-black font-medium align-start"
              onClick={() => setIsChecklistShow(true)}
            >
              내 체크리스트
            </div>
            <div className="w-[25px] h-[25px] flex items-center">
              {isChecklistShow ? <Up /> : <Down />}
            </div>
          </div>
          {isChecklistShow && (
            <div className="w-full px-[18px]">
              <MyCheckList />
            </div>
          )}

          {/* } */}
          <div className="pl-4  h-16 flex w-full items-center">
            <div className="w-[25px] h-[25px]">
              <Edit />{' '}
            </div>
            <div
              className="grow ml-[12px] text-base text-black font-medium align-start"
              onClick={() => navigate('/timeboard')}
            >
              내 모집글{' '}
            </div>
            <div className="w-[25px] h-[25px] flex items-center"></div>
          </div>
        </div>
        <div className="w-full p-[6px] bg-[#F7F7F7]"> </div>

        <div className="p-4 grid grid-cols-1 pt-[32px] w-full grow text-base text-black font-semibold">
          <div className="flex justify-between items-center text-[14px] font-normal border-b-[1px] border-[#f7f7f7] py-[23px] cursor-pointer">
            <div>내 정보 관리</div>
            <SmallNext />
          </div>
          <div className="flex justify-between items-center text-[14px] font-normal border-b-[1px] border-[#f7f7f7] py-[23px] cursor-pointer">
            <div>문의하기</div>
            <SmallNext />
          </div>{' '}
          <div className="flex justify-between items-center text-[14px] font-normal border-b-[1px] border-[#f7f7f7] py-[23px] cursor-pointer">
            <div>공지사항</div>
            <SmallNext />
          </div>{' '}
          <div className="flex justify-between items-center text-[14px] font-normal border-b-[1px] border-[#f7f7f7] py-[23px] cursor-pointer">
            <div>설정</div>
            <SmallNext />
          </div>
          <div></div>
        </div>
      </div>

      <BottomNav state="user" />
      {showModal && <ChangeProfileModal onClose={handleCloseModal} />}
    </div>
  );
};

export default MyPage;
