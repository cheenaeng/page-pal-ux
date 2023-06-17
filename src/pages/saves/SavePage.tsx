import React from 'react'
import { Layout } from '../../components/Layout'
import { CardTiles } from '../../components/CardTiles'
import { MdSort } from 'react-icons/md'
import { Flex, Text, Box, Icon, Divider } from '@chakra-ui/react'
import { savedPages } from '../../data/mock/saves'
import InputSave from '../../components/common/Form/InputSave'

function SavePage() {
  return (
    <Layout>
      <InputSave />
      <Flex justifyContent={'space-between'}>
        <Box>
          <Text fontSize="lg" as="b">
            Sort
          </Text>
          <Icon as={MdSort} ml="5" />
        </Box>
      </Flex>{' '}
      <Divider />
      {/* card tiles  */}
      <Box maxH="75vh" overflowY={'auto'}>
        {/* search bar here  */}
        <CardTiles pages={savedPages} />
      </Box>
    </Layout>
  )
}

export default SavePage
