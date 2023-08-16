import { Box } from '@chakra-ui/react'
import React from 'react'
import Tiptap from '../../components/TipTap'

const EditorPage = () => {
  return (
    <Box
      mx='auto'
      maxWidth={{
        base: '100%',
        '2xl': '80%',
      }}
    >
      <Box
        my='2'
        border='1px'
        borderColor='gray.200'
        borderRadius={'10'}
        boxShadow='md'
      >
        <Tiptap />
      </Box>
    </Box>
  )
}

export default EditorPage
