import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", className = "" }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 
            border border-gray-300 rounded-lg
            bg-white
            text-gray-900 text-sm
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            hover:border-gray-400
            transition-all duration-200
            ${className}
          `.trim()}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
