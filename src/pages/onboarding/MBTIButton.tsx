import React from 'react';

const MBTIButton = ({
  text,
  isSelected,
  onSelected,
}: {
  text: string;
  isSelected: boolean;
  onSelected: (value: string) => void;
}) => {
  return (
    <div
      className={
        'flex items-center justify-center grow py-[10px] border border-solid rounded-full ' +
        (isSelected
          ? 'border-primary bg-primaryBg'
          : 'border-subGray text-subGrayText')
      }
      onClick={() => onSelected(text)}
    >
      {text}
    </div>
  );
};

export default MBTIButton;
