import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex:1;

`;
export const Header = styled.View`
    width: 100%;
    height:70%;
    justify-content: flex-end;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primary};

`;

export const TitleWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    text-align: center;

    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};

    margin-top: 40px;
    font-size: ${RFValue(30)}px;

`;

export const SignInTitle = styled.Text`
    text-align: center;

    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-top: 80px;
    margin-bottom: 67px;
    font-size: ${RFValue(16)}px;
`;

export const Footer = styled.View`
     width: 100%;
    height:30%;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

