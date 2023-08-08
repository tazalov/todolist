import React, { ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";

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
    <Form>
      <StyledEditableInput
        type="text"
        value={initialValue}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
      {error && <Error>{error}</Error>}
    </Form>
  );
}

const StyledEditableInput = styled.input`
  width: 100%;
  padding: 5px;
  color: ${(props) => props.theme.colors.primaryFont};
`;

const Form = styled.div`
  position: relative;
  width: 100%;
`;

const Error = styled.div`
  width: 100%;
  position: absolute;
  bottom: -15px;
  color: red;
  font-size: 10px;
  text-align: center;
`;
