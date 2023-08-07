import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AuthAPI from '../api/AuthAPI'

export const SignInButton = () => {
  return (
    <Button
      colorScheme='purple'
      fontSize='lg'
      sx={{
        borderRadius: '5%',
      }}
      as={Link}
      to={AuthAPI.getGoogleLoginUrl()}
    >
      Sign in
    </Button>
  )
}
