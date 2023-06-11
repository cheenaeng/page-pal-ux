import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
  Image,
  VStack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box
} from '@chakra-ui/react'

import { IPage } from './Layout'
interface PageProps {
  page: IPage
}

export const CardTile: React.FC<PageProps> = ({ page }: PageProps) => {
  return (
    <Card maxW='sm' variant={'elevated'}>
      <CardBody>
        <Image src={page.img.src} alt={page.img.alt} borderRadius='lg' />
        <VStack mt='2' p='3' align='start' maxW='sm'>
          {/* Title */}
          <Text
            align='start'
            fontSize='md'
            as='b'
            overflowWrap={'break-word'}
            noOfLines={1}
          >
            {page.title}
          </Text>

          {/* Glimpse of Content */}
          {/* <Text align='start' noOfLines={2} fontSize='md'>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text> */}

          {/* Link */}
          <Text
            align='start'
            overflowWrap={'break-word'}
            noOfLines={1}
            fontSize='md'
            as='b'
            color='gray.500'
          >
            {page.link}
          </Text>
          {/* Length of article */}
          <Text align='start' fontSize='md' color='gray.500'>
            {page.lengthMin} min
          </Text>
        </VStack>
      </CardBody>
    </Card>
  )
}
