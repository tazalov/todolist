import styled from "styled-components";
import { F } from "../styled/Fragments.styled";
import { C } from "../styled/Common.styled";

const Close = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const Todolist = styled(C.FlexWrapper)`
  ${F.Shadow};
  padding: 10px;
  background-color: ${(props) => props.theme.colors.primaryBg};
  border-radius: 5%;
  position: relative;
  flex: 0 0 250px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 25px;
  color: ${(props) => props.theme.colors.primaryFont};
`;

const Form = styled(C.FlexWrapper)`
  width: 100%;
`;

const List = styled(C.FlexWrapper)`
  width: 100%;
`;

const Buttons = styled(C.FlexWrapper)`
  margin-top: auto;
`;

export const S = {
  Close,
  Todolist,
  Title,
  Form,
  List,
  Buttons,
};
