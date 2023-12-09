import React from 'react';
import { ReactComponent as Next } from '../../assets/icon/icon_next.svg';

const CheckBox = ({
  text,
  checked,
  onClick,
  showContents,
}: {
  text: string;
  checked?: boolean;
  onClick: (newValue: boolean) => void; // 변경된 타입으로 수정
  showContents?: () => void;
}) => {
  return (
    // checkbox
    <div className="w-full flex mt-4 items-center">
      <div
        className="w-full flex cursor-pointer"
        onClick={() => onClick(!checked)}
      >
        <input className="mr-4" type="checkbox" checked={checked} />
        <div className="grow text-sm text-textGray2">{text}</div>
      </div>
      <Next
        className="inset-y-0 left-4 cursor-pointer"
        onClick={showContents}
      />
    </div>
  );
};

export default CheckBox;
