const DislikeModal = ({ onClose }: { onClose: () => void }) => {
  const handleCloseModal = () => {
    onClose();
  };

  const handleDislike = () => {
    console.log('handleDislike');
    onClose();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-50">
      <div
        className="absolute bg-modalBackground w-full h-full"
        onClick={handleCloseModal}
      ></div>
      <div className="relative mx-4 w-96 font-normal text-base text-center flex-col justify-center bg-white rounded-[27px] pb-[21px] px-[22px] pt-[27px] text-black z-50">
        <div className="bg-transparent text-black font-bold flex justify-center text-lg mb-[13px]">
          이 사용자의 글 보지 않기{' '}
        </div>
        <div>홍길동님의 모든 게시글을 보지 않으시겠습니까?</div>
        <div className="flex gap-[5px] justify-between">
          <button
            onClick={onClose}
            className="w-full h-[50px] mt-8 bg-grayScale2 text-black rounded-[27px]"
          >
            취소
          </button>
          <button
            onClick={handleDislike}
            className="w-full h-[50px] mt-8 bg-primary text-white rounded-[27px]"
          >
            안보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DislikeModal;
