import React from 'react';
import { useMutation } from 'react-query';
import { deletePost } from '../../api/articleApi';

const DeleteArticlesModal = ({
  onClose,
  postIds,
}: {
  onClose: () => void;
  postIds: number[];
}) => {
  const handleCloseModal = () => {
    onClose();
  };

  const handleDelete = () => {
    console.log('handleDelete-posts', postIds);
    postIds.map((postId) => {
      tryDeletePost(postId);
    });
    onClose();
  };

  const { mutate: tryDeletePost } = useMutation(
    async (postId: number) => {
      // 비동기 작업을 수행하는 함수 내에서 API 호출
      const data = await deletePost(parseFloat(postId.toString()));
      return data; // 반환된 데이터를 반환
    },
    {
      onSuccess: (data) => {
        console.log(data);
        // 성공 시 실행할 코드
        console.log('게시물 삭제');
        onClose();
      },
      onError: (error) => {
        console.error(error);
        // 에러 시 실행할 코드
      },
    },
  );
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-50">
      <div
        className="absolute bg-modalBackground w-full h-full"
        onClick={handleCloseModal}
      ></div>
      <div className="relative mx-4 w-96 font-normal text-base text-center flex-col justify-center bg-white rounded-[27px] pb-[21px] px-[22px] pt-[27px] text-black z-50">
        <div className="bg-transparent text-black font-bold flex justify-center text-lg mb-[13px]">
          선택한 글이 모두 삭제됩니다.{' '}
        </div>
        <div>정말 모두 삭제하시겠습니까?</div>
        <div className="flex gap-[5px] justify-between">
          <button
            onClick={onClose}
            className="w-full h-[50px] mt-8 bg-grayScale2 text-black rounded-[27px]"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="w-full h-[50px] mt-8 bg-primary text-white rounded-[27px]"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteArticlesModal;
