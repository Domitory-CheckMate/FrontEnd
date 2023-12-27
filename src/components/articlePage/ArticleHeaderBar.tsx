import React from 'react';
import { ReactComponent as Home } from '../../assets/icon/icon_home_line.svg';
import { ReactComponent as Back } from '../../assets/icon/icon_prev.svg';
import { ReactComponent as Share } from '../../assets/icon/icon_share.svg';
import { ReactComponent as More } from '../../assets/icon/icon_more_vertical.svg';
import { useNavigate } from 'react-router-dom';

const ArticleHeaderBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[90px] flex justify-between items-end pb-[15px]">
      <div className="w-full flex justify-between items-center px-4 ">
        <div className="flex items-center gap-x-4">
          <Back className="cursor-pointer" onClick={() => navigate(-1)} />
          <Home className="cursor-pointer" onClick={() => navigate('/main')} />
        </div>
        <div className="flex items-center gap-x-5">
          <Share className="cursor-pointer" />
          <More className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ArticleHeaderBar;
