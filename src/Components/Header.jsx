import { Button, HStack, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack justifyContent={'space-between'} px={'4'} py={'3'} shadow={'lg'} bgColor={'teal.300'} borderRadius={'0 0 20px 20px'}>
     <Heading>Cripsy</Heading>
     <HStack columnGap={'6'}>
        <Button variant={'unstyled'}><Link to='/'>Home</Link></Button>
        <Button variant={'unstyled'}><Link to='/coins'>Coins</Link></Button>
        <Button variant={'unstyled'}><Link to='/exchanges'>Exchanges</Link></Button>
     </HStack>
    </HStack>
  )
}

export default Header
