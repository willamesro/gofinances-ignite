import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { useFocusEffect } from '@react-navigation/native'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { HistoryCard } from '../../components/HistoryCard'

import {
    Container,
    LoadContainer,
    Content,
    Header,
    Title,
    ChartContainer,
    MonthSelect,
    MonthButton,
    MonthIcon,
    Month,
} from './styles'
import { categories } from '../../utils/categories'


interface TransactionData {
    type: 'up' | 'down'
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string
    name: string
    total: string
    color: string
    percent: number
    percentFormatted: string
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [totalbyCategoryes, setTotalbyCategoryes] = useState<CategoryData[]>([])

    const theme = useTheme()

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1))

        } else {
            setSelectedDate(subMonths(selectedDate, 1))
        }

    }


    async function loadData() {
        setIsLoading(true)
        const dataKey = '@gofinances:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted.filter(
            (expensive: TransactionData) =>
                expensive.type === 'down' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        )

        const expensiveTotal = expensives.reduce((accumulator: number, expensive: TransactionData) => {
            return accumulator + Number(expensive.amount)
        }, 0)

        const totalByCategory: CategoryData[] = []

        categories.forEach((category) => {
            let categorySum = 0

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })

            if (categorySum > 0) {
                const percent = categorySum / expensiveTotal * 100
                const percentFormatted = `${percent.toFixed(0)}%`
                const total = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

                totalByCategory.push({ key: category.key, name: category.name, total, color: category.color, percent, percentFormatted })
            }
        })
        setIsLoading(false)
        setTotalbyCategoryes(totalByCategory)
    }

    useFocusEffect(useCallback(() => { loadData() }, [selectedDate]))

    return (
        <Container>
            <Header>
                <Title>Resumo</Title>
            </Header>

            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator color={theme.colors.primary} size='large' />
                </LoadContainer> :
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight()

                    }}
                >

                    <MonthSelect>

                        <MonthButton onPress={() => handleDateChange('prev')} >
                            <MonthIcon name='chevron-left' />
                        </MonthButton>

                        <Month>
                            {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
                        </Month>

                        <MonthButton onPress={() => handleDateChange('next')}>
                            <MonthIcon name='chevron-right' />
                        </MonthButton>
                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie data={totalbyCategoryes}
                            colorScale={totalbyCategoryes.map(category => category.color)}
                            style={{
                                labels:
                                {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={50}
                            x='percentFormatted'
                            y='percent'
                        />
                    </ChartContainer>

                    {
                        totalbyCategoryes.map((item) => (
                            <HistoryCard
                                key={item.key}
                                title={item.name}
                                amount={item.total}
                                color={item.color}
                            />
                        ))
                    }

                </Content>
            }
        </Container>
    )
}