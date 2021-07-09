import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;

    height: ${RFValue(113)}px;
    width:100%;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    line-height: 27px;
    padding-bottom: 19px;
`;

export const Form = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content:space-between;

    padding: 24px;
`;
export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin:8px 0 16px;
`;

