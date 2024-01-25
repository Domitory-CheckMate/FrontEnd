import React from 'react';
import { ReactComponent as Home } from '../../assets/icon/icon_home_line.svg';
import { ReactComponent as Back } from '../../assets/icon/icon_prev.svg';
import { ReactComponent as Share } from '../../assets/icon/icon_share.svg';
import { ReactComponent as More } from '../../assets/icon/icon_more_vertical.svg';
import { useNavigate } from 'react-router-dom';

const ArticleHeaderBar = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  return (
    <div className="w-full h-[90px] flex justify-between items-end pb-[15px]">
      <div className="w-full flex justify-between items-center px-4 ">
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
        className={`z-10 absolute bottom-0 w-full h-full bg-black/50 ${
          isOpenMenu ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpenMenu(false)}
      />
      <div
        className={`z-10 absolute bottom-0 w-full transition-transform transform flex flex-col justify-end items-center px-4 gap-y-2.5 text-sm ${
          isOpenMenu ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div
          className={`w-full flex justify-center items-center rounded-[14px] bg-white`}
          onClick={() => setIsOpenMenu(false)}
        >
          <div
            className="w-full flex justify-center items-center py-3 border-b border-solid border-grayScale2 last:border-b-0 cursor-pointer"
            onClick={() => {
              navigate('/report', {
                state: {
                  postId: id,
                  reason: 'cc',
                },
              });
            }}
          >
            신고
          </div>
        </div>
        <div
          className={`w-full mb-[38px] py-3 flex justify-center items-center rounded-[14px] bg-white cursor-pointer`}
          onClick={() => setIsOpenMenu(true)}
        >
          취소
        </div>
      </div>
    </div>
  );
};

export default ArticleHeaderBar;
