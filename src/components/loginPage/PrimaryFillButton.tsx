import React from 'react';

const PrimaryFillButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="mt-8 py-4 w-full bg-primary text-[18px] text-white rounded-full"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryFillButton;
