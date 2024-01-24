import React, { useState } from 'react';

interface DormitoryTypeInputProps {
  onDormitoryTypeChange: (newDormitoryType: string) => void;
}

const DormitoryTypeInput: React.FC<DormitoryTypeInputProps> = ({
  onDormitoryTypeChange,
}) => {
  const [DormitoryType, setDormitoryType] = useState(-1);

  const handleDormitoryTypeChange = (selectedOption: number) => {
    setDormitoryType(selectedOption);
    if (selectedOption == 0) onDormitoryTypeChange('FIRST');
    if (selectedOption == 1) onDormitoryTypeChange('SECOND');
    if (selectedOption == 2) onDormitoryTypeChange('THIRD');
  };

  return (
    <div className="flex-col ">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">기숙사</div>
      </div>
      <div className="flex justify-between gap-[10px]">
        <div
          className={`grow cursor-pointer text-center mt-[13px] text-sm font-semibold px-[14px] py-[12px]  border-[1px] rounded-[10px] ${
            DormitoryType == 0
              ? 'bg-[#FFE2D8] text-primary border-primary '
              : ' text-[#999] border-[#999]'
          }`}
          onClick={() => handleDormitoryTypeChange(0)}
        >
          제1학생생활관
        </div>
        <div
          className={`grow cursor-pointer text-center mt-[13px] text-sm font-semibold px-[14px] py-[12px]  border-[1px] rounded-[10px] ${
            DormitoryType == 1
              ? 'bg-[#FFE2D8] text-primary border-primary '
              : ' text-[#999] border-[#999]'
          }`}
          onClick={() => handleDormitoryTypeChange(1)}
        >
          제2학생생활관
        </div>
        <div
          className={`grow cursor-pointer text-center mt-[13px] text-sm font-semibold px-[14px] py-[12px]  border-[1px] rounded-[10px] ${
            DormitoryType == 2
              ? 'bg-[#FFE2D8] text-primary border-primary '
              : ' text-[#999] border-[#999]'
          }`}
          onClick={() => handleDormitoryTypeChange(2)}
        >
          제3학생생활관
        </div>
      </div>
    </div>
  );
};

export default DormitoryTypeInput;
