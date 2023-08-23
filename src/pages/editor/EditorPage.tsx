import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Tiptap from '../../components/TipTap'
import { useContext } from 'react'
import { AuthContext } from '../../api/context/authContext'

const EditorPage = () => {
  const { id } = useParams()
  const { authToken } = useContext(AuthContext)
  const bearerToken = authToken.accessToken ?? ''

  return (
    <Box
      mx='auto'
      maxWidth={{
        base: '90%',
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
        <Tiptap bookmarkId={id} bearerToken={bearerToken} />
      </Box>
    </Box>
  )
}

export default EditorPage
