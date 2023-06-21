import React, { useEffect, useState } from 'react'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import {server} from '../index'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'

const Exchanges = () => {

    const [exchanges, setExchanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({status:false, msg:null})

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const {data} = await axios.get(`${server}/exchanges`)
                setExchanges(data)
                setLoading(false)
            }catch(err){
                setError({status:true, msg:"Error loading data !"})
                setLoading(false)
            }
        }

        fetchData();
    }, [])

    if (error.status) {return <ErrorComponent msg={error.msg}/>} 

    return (
        <Container maxW={'container.xl'} my={'4'} >
            <HStack justifyContent={'space-evenly'} flexWrap={"wrap"}>
            {loading ? <Loader /> :
            exchanges.map((item)=>{
              return  <ExchangeCard key={item.id} name={item.name} imgSrc={item.image} rank={item.trust_score_rank} url={item.url} />
            })}
            </HStack>
        </Container>
  )
}

const ExchangeCard = ({name, imgSrc, rank, url}) => (
    <a href={url} target='blank'>
    <VStack shadow={'xl'} w={'52'} h={'52'} p={'4'} m={'4'} gap={'3'} borderRadius={'lg'} cursor={'pointer'} transition={'all 0.3s'} css={{"&:hover": {transform:"scale(1.1)"}}}>
        <Image w={'16'} h={'16'} objectFit={'contain'} src={imgSrc} alt={name}/>
        <Heading size={'lg'}>{rank}</Heading>
        <Text noOfLines={'1'}>{name}</Text>
    </VStack>
    </a>
)

export default Exchanges
