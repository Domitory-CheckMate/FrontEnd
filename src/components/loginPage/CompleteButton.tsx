import React from 'react';

const CompleteButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="py-4 bg-primary text-[18px] text-white rounded-full absolute bottom-[51px] left-4 right-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CompleteButton;
