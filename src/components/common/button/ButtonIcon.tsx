import styled from "styled-components";
import { ReactNode } from "react";

type ButtonPT = {
  title: ReactNode;
  callback: () => void;
  disable?: boolean;
};

export function ButtonIcon({ title, callback, disable }: ButtonPT) {
  return (
    <StyledButton onClick={callback} disabled={disable}>
      {title}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border-radius: 5px;
  padding: 5px;
  color: ${(props) => props.theme.colors.primaryFont};
  &:disabled {
    opacity: 0.5;
  }
`;
