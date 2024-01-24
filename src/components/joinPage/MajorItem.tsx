import React from 'react';

const MajorItem = ({
  department,
  college,
  clicked,
  onClick,
}: {
  department: string;
  college: string;
  clicked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-full flex flex-col gap-y-1 justify-center items-start cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`text-[15px] leading-[18px] font-medium text-${
          clicked ? 'primary' : 'black'
        }`}
      >
        {department}
      </div>
      <div className="text-[11px] leading-[13.2px] font-light text-grayScale4">
        {college}
      </div>
    </div>
  );
};

export default MajorItem;
