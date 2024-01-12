import React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/myPage/BottomNav';
import { ReactComponent as Settings } from '../../assets/icon/icon_settings.svg';
import { ReactComponent as Profile0 } from '../../assets/icon/icon_profile0.svg';
import { ReactComponent as Profile1 } from '../../assets/icon/icon_profile1.svg';
import { ReactComponent as Profile2 } from '../../assets/icon/icon_profile2.svg';
import { ReactComponent as Next } from '../../assets/icon/icon_next_black.svg';
import { ReactComponent as Checklist } from '../../assets/icon/icon_checklist.svg';
import { ReactComponent as TimeBoard } from '../../assets/icon/icon_timeBoard.svg';
import { ReactComponent as ModalLine } from '../../assets/icon/icon_modal_line.svg';
import axios from 'axios';

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

  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNSIsImlhdCI6MTcwNDk5NTkzMSwiZXhwIjoxNzA1NjAwNzMxfQ.24gTBd8ecIiLtMsZjia6ixrfB_aq_nH8ojNpjwZ0s1Y';

  const changeProfile = () => {
    // 프로필 변경 API 호출

    console.log('프로필 변경 성공하냐?');

    axios
      .patch(
        'https://checkmate-domitory.shop/api/member/profile',
        {
          profileImageType: 'PROFILE_' + (profileIndex + 1),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log('프로필 변경 성공');

        // 프로필 변경 성공 시
        onClose();
      })
      .catch((Error) => {
        console.log(Error);
        onClose();
      });

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
            className={`rounded-[28px] border-2 bg-[#FDD678] ${
              profileIndex === 0
                ? 'border-primary'
                : 'opacity-70 border-transparent'
            }`}
            onClick={() => setProfileIndex(0)}
          >
            <div className="w-[73px] h-[73px]">
              <Profile0 />
            </div>
          </div>
          <div
            className={`rounded-[26.5px] border-2 bg-[#99A2E9] ${
              profileIndex === 1
                ? 'border-[#FDD678]'
                : 'opacity-70 border-transparent'
            }`}
            onClick={() => setProfileIndex(1)}
          >
            <div className="w-[73px] h-[73px]">
              <Profile1 />
            </div>
          </div>
          <div
            className={`rounded-[28px] border-2 bg-primary ${
              profileIndex === 2
                ? 'border-[#99A2E9]'
                : 'opacity-70 border-transparent'
            }`}
            onClick={() => setProfileIndex(2)}
          >
            <div className="w-[73px] h-[73px]">
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

  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNSIsImlhdCI6MTcwNDk5NTkzMSwiZXhwIjoxNzA1NjAwNzMxfQ.24gTBd8ecIiLtMsZjia6ixrfB_aq_nH8ojNpjwZ0s1Y';

  useEffect(() => {
    axios
      .get('https://checkmate-domitory.shop/api/member/mypage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;

        // data 객체 내에서 필요한 정보 추출
        const { profileImg, name, major, gender, mbti } = data;

        // state 업데이트
        setProfileImg(profileImg);
        setName(name);
        setMajor(major);
        setGender(gender);
        setMbti(mbti.toUpperCase());
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [showModal]);

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
          <div className="pl-4 h-16 flex w-full items-center">
            <div className="w-[25px] h-[25px]">
              <Checklist />
            </div>
            <div
              className="grow ml-[12px]  items-center flex text-base text-black font-medium align-start"
              onClick={() => navigate('/checklist')}
            >
              내 체크리스트
            </div>
            <div className="w-[25px] h-[25px] flex items-center">
              <Next />
            </div>
          </div>
          <div className="pl-4  h-16 flex w-full items-center">
            <div className="w-[25px] h-[25px]">
              <TimeBoard />
            </div>
            <div
              className="grow ml-[12px] text-base text-black font-medium align-start"
              onClick={() => navigate('/timeboard')}
            >
              내 시간표{' '}
            </div>
            <div className="w-[25px] h-[25px] flex items-center">
              <Next />
            </div>
          </div>
        </div>
        <div className="w-full p-[6px] bg-[#F7F7F7]"> </div>

        <div className="p-4 grid grid-cols-1 gap-y-[34px] pt-[32px] w-full grow text-base text-black font-semibold">
          <div className="text-[18px] font-bold">이용안내</div>
          <div>문의하기</div>
          <div>공지사항</div>
          <div></div>
        </div>
      </div>

      <BottomNav state="user" />
      {showModal && <ChangeProfileModal onClose={handleCloseModal} />}
    </div>
  );
};

export default MyPage;
