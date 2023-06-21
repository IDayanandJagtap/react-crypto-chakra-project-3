import React from 'react'
import { VStack, Image, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const CoinsCard = ({ id, name, imgSrc, symbol, price, currency }) => {
    let currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$'
    return (
        <Link to={`/coins/${id}`} >
            <VStack shadow={'xl'} w={'52'} h={'52'} p={'4'} m={'4'} gap={'3'} borderRadius={'lg'} cursor={'pointer'} transition={'all 0.3s'} css={{ "&:hover": { transform: "scale(1.1)" } }}>
                <Image w={'16'} h={'16'} objectFit={'contain'} src={imgSrc} alt={name} />
                <Heading size={'lg'}>{symbol.toUpperCase()}</Heading>
                <Text noOfLines={'1'}>{name}</Text>
                <Text noOfLines={'1'}>{currencySymbol + " " + price}</Text>
            </VStack>
        </Link>
    )
}

export default CoinsCard
