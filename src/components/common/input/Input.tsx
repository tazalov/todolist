import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableInputProps = {
  initialValue: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  error: string;
  autoFocus?: boolean;
};

export function EditableInput({
  initialValue,
  onChange,
  onBlur,
  onKeyDown,
  error,
  autoFocus,
}: EditableInputProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
      {error && <span className="error-msg">{error}</span>}
    </>
  );
}
