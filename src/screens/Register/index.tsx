import React, { useState } from 'react'
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import { InputForm } from '../../components/Form/InputForm'
import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles'

interface FormProps {
    name: string
    amount: string
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup.
        number().
        typeError('Infome um valor numerico')
        .positive('O valor não pode ser negativo')
        .required('Preço é obrigatório')
})

export function Register() {
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpenClose, setCategoryModalOpenClose] = useState(false)
    const [category, setCategory] = useState(
        {
            key: 'category',
            name: 'Categoria'
        }
    )

    const navigation = useNavigation()


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleSetCategoryModal() {
        setCategoryModalOpenClose(!categoryModalOpenClose)
    }

    async function handleRegister(form: FormProps) {

        if (!transactionType)
            return Alert.alert('Selecione um tipo de transação', undefined, undefined, { cancelable: true })

        if (category.key === 'category')
            return Alert.alert('Selecione uma categoria')

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type:transactionType,
            category: category.key,
            date: new Date()
        }
        
        
        try {
            const dataKey = '@gofinances:transactions'
            const data = await AsyncStorage.getItem(dataKey)
            const curentData = data ? JSON.parse(data) : []
            const dataFormated = [
                ...curentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))
           
            // await AsyncStorage.removeItem(dataKey)

            reset()
            setTransactionType('')
            setCategoryModalOpenClose(false)
            setCategory({
                key: 'category',
                name: 'Categoria'
            })

            navigation.navigate('Listagem')

        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível salvar')

        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <Container>

                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            placeholder='Nome'
                            control={control}
                            name='name'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            placeholder='Preço'
                            control={control}
                            name='amount'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionsTypes>
                            <TransactionTypeButton
                                title='Income'
                                type='up'
                                isActive={transactionType === 'up'}
                                onPress={() => handleTransactionTypeSelect('up')}
                            />

                            <TransactionTypeButton
                                title='Outcome'
                                type='down'
                                isActive={transactionType === 'down'}
                                onPress={() => handleTransactionTypeSelect('down')}
                            />
                        </TransactionsTypes>

                        <CategorySelectButton title={category.name}
                            onPress={handleSetCategoryModal}
                        />
                    </Fields>

                    <Button title='Enviar'
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpenClose}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeCategorySelect={handleSetCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}