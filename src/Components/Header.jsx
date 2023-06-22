import { Button, HStack, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack justifyContent={'space-between'} px={'6'} py={'3'} shadow={'base'} color={'cyan.500'} borderRadius={'0 0 15px 15px'} textShadow={'1px 1px #b4b4b4'}>
      <Heading textShadow={'1px 1px #b4b4b4'}>Cripsy</Heading>
      <HStack columnGap={'6'}>
        <Button variant={'unstyled'}><Link to='/'>Home</Link></Button>
        <Button variant={'unstyled'}><Link to='/coins'>Coins</Link></Button>
        <Button variant={'unstyled'}><Link to='/exchanges'>Exchanges</Link></Button>
      </HStack>
    </HStack>
  )
}

export default Header
