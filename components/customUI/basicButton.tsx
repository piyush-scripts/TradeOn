import React from "react";

export interface IconButtonProps {
  label?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center hover:scale-110 rounded-2xl p-2 -mb-3 -mt-2"
    >
      <div className="flex-col justify-center items-center ">
        <div className="flex -mb-1.5">{icon}</div>
        <span className="text-sm ">{label}</span>
      </div>
    </button>
  );
};
