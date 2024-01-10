import React from 'react';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { ReactComponent as Add } from '../../assets/icon/icon_chat_add.svg';

const ChatInput = () => {
  // input value 상태
  const [value, setValue] = useState('');
  const [sendMsg, setSendMsg] = useState(false);

  useEffect(() => {
    // API에서 데이터를 가져와서 chatItems 상태를 업데이트
    // fetch('your_api_endpoint')
    //   .then((response) => response.json())
    //   .then((data) => setChatItems(data))
    //   .catch((error) => console.error('Error fetching data:', error));

    if (value.length > 0) {
      console.log(value);
      setSendMsg(true);
    } else {
      setSendMsg(false);
    }
  }, [value]);

  return (
    <div className="w-full flex pt-[11px] pb-[37px] px-[16px] gap-[16px] items-center border-t-[1px] border-[#EEE]">
      <Add className="cursor-pointer" />
      <div className="flex items-center rounded-[19.5px] bg-[#F7F7F7] px-[15px] py-[11px] font-normal grow">
        <input
          className="w-full placeholder-[#999] text-[14px] bg-transparent outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="메세지를 입력하세요."
        />
        {sendMsg && (
          <div className="text-primary w-[50px] text-[14px] justify-end cursor-pointer">
            보내기
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
