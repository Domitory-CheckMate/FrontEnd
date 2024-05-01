import React, { useState } from 'react';

const ChatInput = ({ sendHandler }: { sendHandler: (msg: string) => void }) => {
  // input value 상태
  const [value, setValue] = useState('');

  return (
    <div className="shrink-0 w-full h-[87px] flex pt-[11px] px-4 justify-center items-start border-t border-solid border-bottomGray1">
      <div className="w-full flex justify-between items-center gap-x-4 rounded-3xl bg-grayScale1 px-[15px] py-[11px]">
        <input
          className="grow placeholder:text-grayScale4 text-sm bg-transparent outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="메세지를 입력하세요."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (value.length > 0) {
                sendHandler(value);
                setValue('');
              }
            }
          }}
        />
        <div
          className={`text-sm ${
            value.length > 0 ? 'text-primary cursor-pointer' : 'text-grayScale4'
          }`}
          onClick={() => {
            if (value.length > 0) {
              sendHandler(value);
              setValue('');
            }
          }}
        >
          {value.length > 0 && '보내기'}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
