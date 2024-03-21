import React, { useEffect, useState } from 'react';

interface RoomTypeInputProps {
  onRoomTypeChange: (newRoomType: string) => void;
  defaultRoomType?: string;
}

const RoomTypeInput: React.FC<RoomTypeInputProps> = ({
  onRoomTypeChange,
  defaultRoomType,
}) => {
  const [roomType, setRoomType] = useState(-1);

  const handleRoomTypeChange = (selectedOption: number) => {
    if (selectedOption == 0) {
      onRoomTypeChange('1');
      setRoomType(0);
    }
    if (selectedOption == 1) {
      onRoomTypeChange('2');
      setRoomType(1);
    }
  };

  useEffect(() => {
    if (defaultRoomType != undefined) {
      if (defaultRoomType == '1') setRoomType(0);
      if (defaultRoomType == '2') setRoomType(1);
    }
  }, []);

  return (
    <div className="flex-col ">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">
          기숙사 방
        </div>
      </div>
      <div className="flex justify-between gap-[10px]">
        <div
          className={`grow cursor-pointer text-center mt-[13px] text-sm font-semibold px-[14px] py-[12px]  border-[1px] rounded-[10px] ${
            roomType == 0
              ? 'bg-[#FFE2D8] text-primary border-primary '
              : ' text-[#999] border-[#999]'
          }`}
          onClick={() => handleRoomTypeChange(0)}
        >
          2인실
        </div>
        <div
          className={`grow cursor-pointer text-center mt-[13px] text-sm font-semibold px-[14px] py-[12px]  border-[1px] rounded-[10px] ${
            roomType == 1
              ? 'bg-[#FFE2D8] text-primary border-primary '
              : ' text-[#999] border-[#999]'
          }`}
          onClick={() => handleRoomTypeChange(1)}
        >
          4인실
        </div>
      </div>
    </div>
  );
};

export default RoomTypeInput;
