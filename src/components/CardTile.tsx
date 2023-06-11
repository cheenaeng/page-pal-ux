import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
  Image,
  VStack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button
} from '@chakra-ui/react'

export const CardTile = () => {
  return (
    <Card maxW='sm' variant={'elevated'}>
      <CardBody>
        <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <VStack mt='2' p='2' align='start'>
          <Heading size='md'>How to keep yourself sane</Heading>
          <Text align='start' noOfLines={2} fontSize='md'>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          {/* <Text color='blue.600' fontSize='2xl'>
            $450
          </Text> */}
        </VStack>
      </CardBody>
    </Card>
  )
}
