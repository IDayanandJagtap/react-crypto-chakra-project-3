import React, { useEffect, useState } from 'react'
import { Container, HStack, RadioGroup, Radio, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { server } from '../index'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'
import CoinsCard from './CoinsCard'

const Coins = () => {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)
    const [currency, setCurrency] = useState('inr')
    const [page, setPage] = useState(1)

    const changePage = (e) => {
        if (e.target.name === 'previous') {
            setPage(page - 1)
            setLoading(true)
        }
        else {
            // currently this does not work because even the last page returns 100 elements !
            if (coins.length === 100) {
                setPage(page + 1)
                setLoading(true)
            } else {
                e.target.isDisabled = true
            }
        }
    }

    useEffect(() => {
        const fetchCoinsData = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data)
                setLoading(false)
            } catch (err) {
                setError(true)
                setLoading(false)
            }
        }

        fetchCoinsData();
    }, [page, currency])

    if (error.status) { return <ErrorComponent msg={"Error loading data !"} /> }

    return (
        <Container maxW={'container.xl'} my={'4'} >
            {loading ? <Loader /> : (
                <>

                    <RadioGroup value={currency} onChange={setCurrency} colorScheme='cyan'>
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
                    <HStack justifyContent={'space-between'} padding={'8'}>
                        <Button colorScheme='cyan' name="previous"
                            onClick={changePage} isDisabled={page === 1 ? true : false}
                        >
                            <BsArrowLeftShort size={'30'} /> Previous
                        </Button>

                        <Text>Page {page}</Text>
                        <Button colorScheme='cyan' onClick={changePage} >Next <BsArrowRightShort size={'30'} /></Button>
                    </HStack>
                </>
            )}
        </Container>
    )
}


export default Coins
