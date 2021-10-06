import React from "react";

export const Button: React.FC<{
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, className, onClick }) => {
  return (
    <button
      className={`border border-white px-2 py-1 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
