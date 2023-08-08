import styled from "styled-components";

const Container = styled.div`
  max-width: 1270px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
`;

type FlexWrapperPT = {
  direction?: string;
  justify?: string;
  align?: string;
  wrap?: string;
  content?: string;
  gap?: string;
};

const FlexWrapper = styled.div<FlexWrapperPT>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  align-content: ${(props) => props.content || "stretch"};
  gap: ${(props) => props.gap || "0px"};
`;

export const C = {
  Container,
  FlexWrapper,
};
