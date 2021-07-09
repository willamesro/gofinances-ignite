import React, { useCallback, useEffect, useState } from 'react'

import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'


import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LoadContainer
} from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighlightProps {
    amount: string
    lastTransaction: string
}
interface HighlightData {
    entries: HighlightProps
    expensives: HighlightProps
    total: HighlightProps
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [HighlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
    const theme = useTheme()

    function getLastTransactionDate(collection: DataListProps[], type: 'up' | 'down') {
        const lastTransaction = new Date(Math.max.apply(Math, collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime())))

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`


    }

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions'

        const response = await AsyncStorage.getItem(dataKey)
        const data = response ? JSON.parse(response) : []

        let entriesTotal = 0
        let expensivesTotal = 0


        const transactionsFormatted: DataListProps[] = data.map((item: DataListProps) => {

            if (item.type === 'up') {
                entriesTotal += Number(item.amount)

            } else {
                expensivesTotal += Number(item.amount)
            }


            const amount = Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                amount,
                name: item.name,
                type: item.type,
                category: item.category,
                date

            }

        })
        const total = entriesTotal - expensivesTotal

        setTransactions(transactionsFormatted)

        const lastTransactionEntries = getLastTransactionDate(data, 'up')
        const lastTransactionExpensives = getLastTransactionDate(data, 'down')
        const totalInterval = `01 à ${lastTransactionExpensives}`

        setHighlightData(
            {
                entries: { amount: entriesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), lastTransaction: `Última entrada dia ${lastTransactionEntries}` },
                expensives: { amount: expensivesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), lastTransaction: `Útima saída dia ${lastTransactionExpensives}` },
                total: { amount: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), lastTransaction: totalInterval }
            })

        setIsLoading(false)
    }
    
    useEffect(() => {
        loadTransactions()
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions()

    }, []))


    return (
        <Container>
            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator color={theme.colors.primary} size='large' />
                </LoadContainer> :
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/58307770?v=4' }} />
                                <User>
                                    <UserGreeting>Ola,</UserGreeting>
                                    <UserName>Willames</UserName>
                                </User>
                            </UserInfo>

                            <LogoutButton onPress={() => { }}>
                                <Icon name='power' />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards >
                        <HighlightCard
                            title='Entrada'
                            amount={HighlightData.entries.amount}
                            lastTransaction={HighlightData.entries.lastTransaction}
                            type='up'
                        />
                        <HighlightCard
                            title='Saída'
                            amount={HighlightData.expensives.amount}
                            lastTransaction={HighlightData.expensives.lastTransaction}
                            type='down'
                        />
                        <HighlightCard
                            title='Total'
                            amount={HighlightData.total.amount}
                            lastTransaction={HighlightData.total.lastTransaction}
                            type='total'
                        />
                    </HighlightCards>

                    <Transactions>

                        <Title>Listagem</Title>

                        <TransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />

                    </Transactions>
                </>
            }

        </Container>
    )
}
