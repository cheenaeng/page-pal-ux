import React from 'react'
import { CardTile } from './CardTile'
import { Navbar } from './Navbar'
import {
  Box,
  Container,
  VStack,
  Wrap,
  Divider,
  Text,
  Icon,
  HStack,
  Flex
} from '@chakra-ui/react'
import { CardTiles } from './CardTiles'
import { MdSort } from 'react-icons/md'

export interface IPage {
  id: string
  title: string
  img: {
    src: string
    alt: string
  }
  lengthMin: number
  link: string
}
const savedPages: IPage[] = [
  {
    id: '23423',
    title: 'How to keep yourself sane',
    img: {
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      alt: 'Green double couch with wooden legs'
    },
    lengthMin: 3,
    link: 'Fobes.mentalHealth.com'
  },
  {
    id: '23424',
    title: 'Coding Best Practice For NodeJs Typescript',
    img: {
      src: 'https://www.gettingsmart.com/wp-content/uploads/2015/04/programming-concept-482x335-1.jpg',
      alt: 'Laptop picture'
    },
    lengthMin: 5,
    link: 'medium.articles.techblog.com'
  }
]

export const Layout = () => {
  return (
    <VStack p='10'>
      {/* header section  */}
      <Box width={'100%'}>
        <Flex justifyContent={'space-between'}>
          <Text align='start' fontSize='lg' as='b'>
            Saves
          </Text>
          <Box>
            <Text fontSize='lg' as='b'>
              Sort
            </Text>
            <Icon as={MdSort} ml='5' />
          </Box>
        </Flex>
      </Box>

      <Divider />

      {/* card tiles  */}
      <Box maxH='75vh' overflowY={'auto'}>
        <CardTiles pages={savedPages} />
      </Box>
    </VStack>
  )
}
