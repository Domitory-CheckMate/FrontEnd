import React from 'react';

const ChecklistTag = ({ emoji, text }: { emoji: string; text: string }) => {
  return (
    <div className="py-2 px-3 bg-keywordTagBorder rounded-full text-[10px] flex items-center justify-center gap-x-[5px]">
      <div>{emoji}</div>
      <div>{text}</div>
    </div>
  );
};

export default ChecklistTag;
