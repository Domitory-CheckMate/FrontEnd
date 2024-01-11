import React from 'react';

import { ReactComponent as Profile0 } from '../../assets/icon/icon_profile_0.svg';

const MsgItem = ({
  id,
  img,
  name,
  content,
  time,
}: {
  id: number;
  img: string;
  name: string;
  content: string;
  time: string;
}) => {
  return (
    <div className="w-full  ">
      {id === 1 && (
        <div className="flex justify-end mt-[12px]">
          <div className="text-[#999] flex flex-col text-[10px] font-normal justify-end mr-[4px]">
            <div className="grow"> </div>
            {time}
          </div>
          <div className="max-w-[270px] bg-primary rounded-tl-3xl rounded-b-3xl text-[14px] text-white p-[16px] ">
            {content}
          </div>
        </div>
      )}

      {id !== 1 && (
        <div className="flex justify-start ">
          <Profile0 className="w-[52px] h-[52px] mr-[9px]" />
          <div className="max-w-[270px] bg-[#f7f7f7] rounded-tr-3xl rounded-b-3xl text-[14px] text-black p-[16px] mt-[12px] ">
            {content}
          </div>
          <div className="text-[#999] flex flex-col text-[10px] font-normal inline-block align-text-bottom ml-[4px]">
            <div className="grow"> </div>
            {time}
          </div>
        </div>
      )}
    </div>
  );
};

export default MsgItem;
