import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import ErrorComponent from './ErrorComponent'
import { useParams } from 'react-router-dom'
import { Badge, Container, HStack, Heading, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'

const CoinDetails = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [currency, setCurrency] = useState('inr')

  let currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$'

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`)
        console.log(data)
        setCoin(data)
        setLoading(false)
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }

    fetchCoinData();
  }, [id])

  if (error.status) { return <ErrorComponent msg={"Error loading data !"} /> }

  return (
    <Container maxW={'container.xl'} border={'1px solid black'}>
      {loading ? <Loader /> : (
        <>

          <RadioGroup value={currency} onChange={setCurrency} colorScheme='cyan'>
            <HStack p={'8'} >
              <Radio value='inr'>INR</Radio>
              <Radio value='eur'>EUR</Radio>
              <Radio value='usd'>USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack alignItems={['center', 'flex-start']} p={['0', '4']}>
            <Text opacity={0.7} alignSelf={'center'}>Last updated at {Date(coin.market_data.last_updated).split('G')[0]}</Text>
            <Image src={coin.image.large} objectFit={'contain'} w={'32'} h={'32'}></Image>

            <Stat w={'32'} textAlign={'center'}>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{`${currencySymbol}${coin.market_data.current_price[currency]}`}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.market_cap_change_percentage_24h < 0 ? "decrease" : "increase"} />
                {coin.market_data.market_cap_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Heading w={'32'} textAlign={'center'}>#{coin.market_cap_rank}</Heading>

            <CustomBar low={coin.market_data.low_24h[currency]} high={coin.market_data.high_24h[currency]} currencySymbol={currencySymbol} />

            <Item title={'Max supply'} value={coin.market_data.max_supply} currencySymbol={''} />
            <Item title={'Max circulation'} value={coin.market_data.circulating_supply} currencySymbol={''} />
            <Item title={'Market cap'} value={coin.market_data.market_cap[currency]} currencySymbol={currencySymbol} />
            <Item title={'All time low'} value={coin.market_data.atl[currency]} currencySymbol={currencySymbol} />
            <Item title={'All time high'} value={coin.market_data.ath[currency]} currencySymbol={currencySymbol} />
          </VStack>
        </>
      )}

    </Container>
  )
}

const Item = ({ title, value, currencySymbol }) => (
  <HStack justifyContent={'space-between'} w={'full'}>
    <Heading size={'md'} fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Heading>
    <Text>{currencySymbol + value}</Text>
  </HStack>
)

const CustomBar = ({ low, high, currencySymbol }) => (
  <VStack w={'full'} my={'8'}>
    <Progress value={'50'} colorScheme='cyan' w={'full'}></Progress>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge colorScheme='red' fontSize={'sm'}>{currencySymbol + low}</Badge>
      <Text opacity={0.7}>Last 24 hours</Text>
      <Badge colorScheme='green' fontSize={'sm'}>{currencySymbol + high}</Badge>
    </HStack>
  </VStack>
)


export default CoinDetails
