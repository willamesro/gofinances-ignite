import styled from "styled-components/native";

import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
    background-color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(14)}px;
    width: 100%;

    border-radius: 5px;
    padding:16px 18px;
    margin-bottom: 8px;
`;