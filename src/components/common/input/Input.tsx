import React, { ChangeEvent, KeyboardEvent } from "react";

type EditableInputPT = {
  initialValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
}: EditableInputPT) {
  return (
    <>
      <input
        type="text"
        value={initialValue}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
      {error && <span className="error-msg">{error}</span>}
    </>
  );
}
