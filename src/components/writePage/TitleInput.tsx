import React, { ChangeEvent, useState } from 'react';

interface TitleInputProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  defaultValue?: string | null;
}

const TitleInput: React.FC<TitleInputProps> = ({
  title,
  onTitleChange,
  defaultValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    onTitleChange(newTitle);
    setText(newTitle);
  };
  const [text, setText] = useState(defaultValue ? defaultValue : '');
  return (
    <div className="flex-col mt-[25px]]">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">{title}</div>
      </div>
      <div className="flex w-full mt-[13px] text-sm font-normal px-[14px] py-[12px] border-[#999] border-[1px] rounded-[10px]">
        <input
          className="w-full h-[17px] text-black  placeholder-[#999] focus:outline-none"
          placeholder="모집글의 제목을 입력하세요"
          onChange={handleChange}
          value={text}
        />
      </div>
    </div>
  );
};

export default TitleInput;
