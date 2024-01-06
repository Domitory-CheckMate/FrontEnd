import React from 'react';

const MBTIButton = ({
  text,
  icon,
  content,
  isSelected,
  onSelected,
}: {
  text: string;
  icon: string;
  content: string;
  isSelected: boolean;
  onSelected: (value: string) => void;
}) => {
  return (
    <div
      className={
        'flex flex-col py-[11px] gap-y-[11px] items-center justify-center grow border border-solid rounded-[19px] ' +
        (isSelected
          ? 'border-primary bg-primaryBg text-primary'
          : 'border-subGray text-subGrayText')
      }
      onClick={() => onSelected(text)}
    >
      <div className="flex flex-col justify-center items-center gap-y-1.5">
        <div>{icon}</div>
        <div className="font-medium text-[10px]">{content}</div>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default MBTIButton;
