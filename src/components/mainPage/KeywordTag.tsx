import React from 'react';

const KeywordTag = ({
  keyword,
  state,
  onClick,
}: {
  keyword: string;
  state: boolean;
  onClick: () => void;
}) => {
  const moreStyle = state
    ? 'bg-primary text-white'
    : 'bg-invalidGray border border-solid border-keywordTagBorder text-textGray3';

  return (
    <div
      className={
        'flex cursor-pointer shrink-0 items-center justify-center rounded-full py-1.5 px-[18px] text-xs ' +
        moreStyle
      }
      onClick={onClick}
    >
      {keyword}
    </div>
  );
};

export default KeywordTag;
