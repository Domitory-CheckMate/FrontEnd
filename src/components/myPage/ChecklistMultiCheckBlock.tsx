import React from 'react';

const Option = ({
  text,
  checked,
  onClick,
}: {
  text: string;
  checked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`text-base text-center flex-shrink-0 flex py-1.5 px-[20px] border-[1px] rounded-[19px] cursor-pointer ${
        checked
          ? 'bg-primary20 border-primary text-black '
          : 'bg-white opacity-100 border-[#D9D9D9] text-[#ABABAB]'
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

const ChecklistMultiCheckBlock = ({
  title,
  option,
  selectedOption,
  onOptionChange,
  subtitle,
}: {
  title: string;
  option: string[];
  selectedOption: number[];
  onOptionChange: (array: number[]) => void;
  subtitle?: string;
}) => {
  const handleOptionClick = (index: number) => {
    const newArray = [...selectedOption];
    newArray[index] = selectedOption[index] == 1 ? 0 : 1;

    if (index == newArray.length - 1 && newArray[index] == 1) {
      for (let i = 0; i < newArray.length - 1; i++) {
        newArray[i] = 0;
      }
      newArray[index] = 1;
    } else if (index != newArray.length - 1 && newArray[index] == 1) {
      // newArray 0으로 초기화
      newArray[newArray.length - 1] = 0;
    }
    onOptionChange(newArray);
  };

  return (
    <div className="flex-col text-base font-normal text-center items-center text-black px-4 pb-1 mb-[20px]">
      <div className="flex w-full gap-x-[8px]">
        <div className="text-start">{title}</div>
        {subtitle && (
          <div className="text-[12px] text-[#929292] font-thin">{subtitle}</div>
        )}
      </div>
      <div className="flex w-full gap-x-[5px] mt-[15px] flex-wrap gap-y-[8px]">
        {option.map((text, index) => (
          <Option
            key={index}
            text={text}
            checked={selectedOption[index] == 1}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChecklistMultiCheckBlock;
