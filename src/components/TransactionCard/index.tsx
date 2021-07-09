import React from 'react';
import { categories } from '../../utils/categories';

import {
    Container,
    Title,
    Amount,
    Footer,
    Categoriy,
    Icon,
    CategoriyName,
    Date,
} from './styles'


export interface TransactionCardProps {
    type: 'up' | 'down'
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    data: TransactionCardProps

}


export function TransactionCard({ data }: Props) {
    const category = categories.filter(item => item.key===data.category)[0]

    return (
        <Container>
            <Title>
                {data.name}
            </Title>

            <Amount type={data.type}>
                {data.type==='down' && '- '}
                {data.amount}
            </Amount>

            <Footer>

                <Categoriy>
                    <Icon name={category.icon} />

                    <CategoriyName>
                        {category.name}
                    </CategoriyName>
                </Categoriy>

                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>)
}