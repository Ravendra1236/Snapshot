import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white ",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles =
  "px-4 py-2 rounded-md font-normal flex items-center justify-center";

function Button({ variant, text, startIcon, onClick, fullWidth }: ButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${widthClass}`}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
}

export default Button;
