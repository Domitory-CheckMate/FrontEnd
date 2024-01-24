import React from 'react';
import { useNavigate } from 'react-router-dom';

const FailReportBtn = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-5 w-full h-full px-10 flex justify-center items-center bg-black/50">
      <div className="w-full px-5 py-[26px] flex flex-col justify-center items-center gap-y-[22px] rounded-[20px] bg-white">
        <div className="leading-8">{message}</div>
        <div
          className="w-full py-3 flex justify-center items-center text-white text-sm bg-primary rounded-[27px] cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default FailReportBtn;
