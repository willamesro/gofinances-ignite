import React from 'react'
import { FlatList } from 'react-native'
import { categories } from '../../utils/categories'

import { Button } from '../../components/Form/Button'

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,

} from './styles'

interface Category {
    key: string;
    name: string;
}
interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeCategorySelect: () => void;

}

export function CategorySelect({ category, setCategory, closeCategorySelect }: Props) {

    function handleSetCategorySelect(category: Category) {
        setCategory(category)
    }
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.key}
                style={{ flex: 1, width: '100%' }}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleSetCategorySelect(item)}
                        isActive={category.key === item.key}
                    >

                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title='Selecionar' onPress={closeCategorySelect} />
            </Footer>
        </Container>
    )

}

