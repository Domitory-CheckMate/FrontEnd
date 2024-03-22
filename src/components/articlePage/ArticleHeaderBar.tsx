import React, { useEffect } from 'react';
import { ReactComponent as Home } from '../../assets/icon/icon_home_line.svg';
import { ReactComponent as Back } from '../../assets/icon/icon_prev.svg';
import { ReactComponent as Share } from '../../assets/icon/icon_share.svg';
import { ReactComponent as More } from '../../assets/icon/icon_more_vertical.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { memberIdState } from '../../data/atoms';
import { articlePostType } from '../../data/type';
import { useState } from 'react';
import DislikeModal from './DislikeModal';
import DeleteModal from './DeleteModal';

const ArticleHeaderBar = ({
  postId,
  userId,
  article,
}: {
  postId: string | undefined;
  userId: number | undefined;
  article: articlePostType | undefined;
}) => {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [memberId] = useRecoilState(memberIdState);
  const [showDislikeModal, setShowDislikeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDislikeModal = () => {
    setShowDislikeModal(!showDislikeModal);
  };
  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const deleteDone = () => {
    setShowDeleteModal(false);
    navigate(-1);
  };
  useEffect(() => {
    '다시렌더링';
  });

  return (
    <div className="w-full flex justify-between items-top pb-[15px]">
      <div className="shrink-0 flex justify-between items-center mt-[65px] w-full px-4 pb-0">
        <div className="flex items-center gap-x-4">
          <Back className="cursor-pointer" onClick={() => navigate(-1)} />
          <Home className="cursor-pointer" onClick={() => navigate('/main')} />
        </div>
        <div className="flex items-center gap-x-5">
          <Share className="cursor-pointer" />
          <More
            className="cursor-pointer"
            onClick={() => setIsOpenMenu(true)}
          />
        </div>
      </div>
      <div
        className={`w-full max-w-[450px] h-full bg-black opacity-50 fixed left-0 right-0 bottom-0 mx-auto z-5 ${
          isOpenMenu ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpenMenu(false)}
      />
      <div
        className={`z-10 w-full max-w-[450px] pb-[38px] px-[16px] fixed bottom-0 left-0 right-0 mx-auto box-border bg-transparent transition-transform transform ${
          isOpenMenu ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div
          className={`w-full flex flex-col justify-center items-center text-sm rounded-[14px] bg-white mb-[10px]`}
          onClick={() => setIsOpenMenu(false)}
        >
          {memberId != userId ? (
            <div
              className="w-full flex justify-center items-center py-3 border-b border-solid border-grayScale2 last:border-b-0 cursor-pointer"
              onClick={() => {
                navigate('/report', {
                  state: {
                    reportCase: 'POST',
                    reportTarget: postId,
                  },
                });
              }}
            >
              신고
            </div>
          ) : (
            <div
              className="w-full flex justify-center items-center py-3 border-b border-solid border-grayScale2 last:border-b-0 cursor-pointer"
              onClick={() => {
                navigate('/modify', {
                  state: {
                    postId: postId,
                    article: article,
                  },
                });
              }}
            >
              게시글 수정
            </div>
          )}
          {memberId != userId ? (
            <div
              className="w-full flex justify-center items-center py-3 border-b border-solid border-grayScale2 last:border-b-0 cursor-pointer"
              onClick={handleDislikeModal}
            >
              이 사용자의 글 보지 않기
            </div>
          ) : (
            <div
              className="w-full flex justify-center items-center py-3 text-primary border-b border-solid border-grayScale2 last:border-b-0 cursor-pointer"
              onClick={handleDeleteModal}
            >
              삭제
            </div>
          )}
        </div>
        <div
          className={`w-full py-3 flex justify-center text-sm items-center rounded-[14px] bg-white cursor-pointer`}
          onClick={() => setIsOpenMenu(false)}
        >
          취소
        </div>
      </div>
      {showDislikeModal && <DislikeModal onClose={handleDislikeModal} />}
      {showDeleteModal && (
        <DeleteModal onClose={deleteDone} postId={postId as string} />
      )}
    </div>
  );
};

export default ArticleHeaderBar;
