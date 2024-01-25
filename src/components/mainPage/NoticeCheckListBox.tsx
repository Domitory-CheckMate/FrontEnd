import React from 'react';
import { ReactComponent as NextGray } from '../../assets/icon/icon_next_gray.svg';
import { useNavigate } from 'react-router-dom';

const NoticeCheckListBox = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between rounded-2xl bg-primary10 py-[15px] pl-4 pr-[21px] mb-[17px]"
      onClick={() => navigate('/checklist/first')}
    >
      <div className="flex flex-col gap-y-[6px] items-start">
        <div className="text-primary font-bold">
          룸메이트 체크리스트 작성하러 가기
        </div>
        <div className="text-[12px] text-[#838383]">
          내가 찾는 룸메이트를 추천받을 수 있어요.
        </div>
      </div>
      <NextGray />
    </div>
  );
};

export default NoticeCheckListBox;
