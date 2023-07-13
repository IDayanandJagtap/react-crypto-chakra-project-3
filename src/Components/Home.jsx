import React from 'react'
import { HStack, Image } from '@chakra-ui/react'
import img from '../assets/btc.png'
import { motion } from 'framer-motion'
const Home = () => {
  return (
    <HStack h={'85vh'} w={'full'} alignItems={'center'} justifyContent={'center'} >
      <motion.div style={{ height: '100%' }} animate={{ translateY: '40px' }} transition={{
        ease: "linear",
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}>
        <Image src={img} w={'full'} h={'full'} objectFit={'contain'} />
      </motion.div>
    </HStack>
  )
}

export default Home
