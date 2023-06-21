import React, { useEffect, useState } from 'react'
import { Container, HStack, RadioGroup, Radio } from '@chakra-ui/react'
import axios from 'axios'
import { server } from '../index'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'
import CoinsCard from './CoinsCard'

const Coins = () => {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)
    const [currency, setCurrency] = useState('inr')

    useEffect(() => {
        const fetchCoinsData = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}`)
                setCoins(data)
                setLoading(false)
            } catch (err) {
                setError(true)
                setLoading(false)
            }
        }

        fetchCoinsData();
    }, [loading, currency])

    if (error.status) { return <ErrorComponent msg={"Error loading data !"} /> }

    return (
        <Container maxW={'container.xl'} my={'4'} >
            {loading ? <Loader /> : (
                <>
                    <RadioGroup value={currency} onChange={setCurrency}>
                        <HStack p={'8'} >
                            <Radio value='inr'>INR</Radio>
                            <Radio value='eur'>EUR</Radio>
                            <Radio value='usd'>USD</Radio>
                        </HStack>
                    </RadioGroup>
                    <HStack justifyContent={'space-evenly'} flexWrap={"wrap"}>
                        {coins.map((item) => {
                            return <CoinsCard key={item.id} id={item.id} name={item.name} imgSrc={item.image} price={item.current_price} symbol={item.symbol} currency={currency} />
                        })}
                    </HStack>
                </>
            )}
        </Container>
    )
}


export default Coins
