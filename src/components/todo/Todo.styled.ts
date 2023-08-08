import styled from "styled-components";
import { C } from "../styled/Common.styled";

const Todo = styled(C.FlexWrapper)`
  padding: 5px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryFont};
  width: 100%;
  span {
    text-align: left;
    display: inline-block;
    width: 100%;
  }
`;

const Form = styled(C.FlexWrapper)`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    background-color: transparent;
  }
`;

const Error = styled.div`
  width: 100%;
  position: absolute;
  bottom: -10px;
  color: red;
  font-size: 10px;
  text-align: center;
`;

export const S = { Todo, Form, Error };
