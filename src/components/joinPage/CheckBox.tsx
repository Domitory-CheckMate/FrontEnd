import React from 'react';
import { ReactComponent as Next } from '../../assets/icon/icon_next.svg';
import { ReactComponent as Checked } from '../../assets/icon/icon_checkbox_checked.svg';
import { ReactComponent as Unchecked } from '../../assets/icon/icon_checkbox_unchecked.svg';

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
      <div className="w-full flex cursor-pointer items-center h-[17px] ">
        <div className="flex items-center h-[17px] w-[15px] mr-[7px] pt-[2px]">
          {checked ? (
            <Checked onClick={() => onClick(!checked)} />
          ) : (
            <Unchecked onClick={() => onClick(!checked)} />
          )}
        </div>

        <div
          className="grow text-sm text-textGray2 align-middle flex items-center"
          onClick={showContents}
        >
          {text}
        </div>
      </div>
      <Next className="w-[14px] cursor-pointer" onClick={showContents} />
    </div>
  );
};

export default CheckBox;
