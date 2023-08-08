import styled, { css } from "styled-components";

type ButtonPT = {
  title: string;
  callback: () => void;
  disable?: boolean;
  active?: "true" | "false";
};

export function Button({
  title,
  callback,
  disable,
  active = "false",
}: ButtonPT) {
  return (
    <StyledButton onClick={callback} disabled={disable} active={active}>
      {title}
    </StyledButton>
  );
}

type StyledButtonPT = {
  active: "true" | "false";
};

const StyledButton = styled.button<StyledButtonPT>`
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.colors.primaryFont};
  color: ${(props) => props.theme.colors.primaryFont};
  ${(props) =>
    props.active === "true" &&
    css`
      background-color: ${(props) => props.theme.colors.accent};
      color: ${(props) => props.theme.colors.secondaryFont};
      border-color: ${(props) => props.theme.colors.accent};
    `};
`;
