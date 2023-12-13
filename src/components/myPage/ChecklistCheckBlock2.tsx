import React from 'react';
import { useState } from 'react';

const Option = ({
  text,
  checked,
  onClick,
}: {
  text: string;
  checked: boolean;
  onClick: () => void;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleOnClick = () => {
    setIsChecked(!isChecked); // 클릭할 때마다 checked 상태를 토글
    onClick(); // 부모 컴포넌트에서 전달된 함수 실행
  };

  return (
    <div
      className={`text-base text-center flex-shrink-0 flex py-1.5 px-[20px] border-[1px] rounded-[19px] cursor-pointer ${
        isChecked
          ? 'bg-primary20 border-primary text-black '
          : 'bg-white opacity-100 border-[#D9D9D9] text-[#ABABAB]'
      }`}
      onClick={handleOnClick}
    >
      {text}
    </div>
  );
};

const ChecklistCheckBlock2 = ({
  title,
  subtitle,
  option,
}: {
  title: string;
  subtitle?: string;
  option: string[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<boolean>>(
    new Array(option.length).fill(false),
  );

  const handleOptionClick = (index: number) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = !updatedSelectedOptions[index];
    setSelectedOptions(updatedSelectedOptions);
  };

  return (
    <div className="flex-col text-base font-normal text-center items-center text-black px-4 pb-1 mb-[20px]">
      <div className="flex gap-[4px]">
        <div className="text-start">{title}</div>
        <div className="text-[12px] font-light text-[#929292]">{subtitle}</div>
      </div>
      <div className="flex w-full gap-x-[5px] mt-[15px] flex-wrap gap-y-[8px]">
        {option.map((text, index) => (
          <Option
            key={index}
            text={text}
            checked={selectedOptions[index]}
            onClick={() => handleOptionClick(index)}
          />
        ))}{' '}
      </div>
    </div>
  );
};

export default ChecklistCheckBlock2;
