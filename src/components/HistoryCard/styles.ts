import styled from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"

interface ContainerProps {
    color: string
}

export const Container = styled.View<ContainerProps>`
    width: 100%;

    background-color: ${({ theme }) => theme.colors.shape};
    border-color: ${({ color }) => color};
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 8px;
    padding: 13px 24px;
    border-radius: 5px;
    border-left-width: 5px;
`;
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size:${RFValue(15)}px;

`;

export const Amount = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size:${RFValue(15)}px;
`;

