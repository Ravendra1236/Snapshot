interface InputProps {
  placeholder: string;
  ref: any;
}

export function Input({ ref, placeholder }: InputProps) {
  return (
    <div>
      <input
        type={"text"}
        className="px-4 py-2 border rounded m-2"
        ref={ref}
        placeholder={placeholder}
      />
    </div>
  );
}
