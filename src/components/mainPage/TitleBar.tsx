import React from 'react';
import { ReactComponent as Next } from '../../assets/icon/icon_next_black.svg';

const TitleBar = ({
  text,
  deco,
  onClick,
}: {
  text: string;
  deco: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-full flex items-center justify-between px-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-x-[5px] text-[18px] font-bold">
        <div>{text}</div>
        <div>{deco}</div>
      </div>
      <Next />
    </div>
  );
};

export default TitleBar;
