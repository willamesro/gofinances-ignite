import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
    flex: 1;
    justify-content:space-between;
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

export const LoadContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;    
`;

export const MonthSelect = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
`;

export const MonthButton = styled(BorderlessButton)``;

export const MonthIcon = styled(Feather)`
    font-size:${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size:${RFValue(20)}px;

`;
