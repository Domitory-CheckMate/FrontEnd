import React, { useState, useRef } from 'react';

const IntroInput = ({ intro }: { intro: string }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  };
  return (
    <div className="flex-col mt-[25px]]">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">{intro}</div>
      </div>
      <div className="flex">
        <div className="flex w-full mt-[13px] text-sm font-normal px-[14px] py-[12px] border-[#999] border-[1px] rounded-[10px]">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={onChange}
            className="w-full h-auto text-black placeholder-#999 focus:outline-none resize-none"
            placeholder="자신을 한 줄로 소개해주세요."
          />
        </div>
      </div>
    </div>
  );
};

export default IntroInput;
