import React from 'react';

const PrimaryStrokeButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="mt-2.5 py-4 w-full border border-primary text-[18px] rounded-full"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryStrokeButton;
