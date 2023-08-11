import { Box } from '@chakra-ui/react'
import React from 'react'
import Tiptap from '../../components/TipTap'

const EditorPage = () => {
  return (
    <Box
      mx='auto'
      maxWidth={{
        base: '100%',
        '2xl': '60%',
      }}
    >
      <Box my='2'>
        <Tiptap />
      </Box>
    </Box>
  )
}

export default EditorPage
