import { useContext } from 'react'
import {
  HStack,
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { SignInButton } from './SignInButton'
import { AuthContext } from '../api/context/authContext'

export function ProfileManagementIcon() {
  const { authToken, setAuthToken } = useContext(AuthContext)
  const { onOpen, onClose, isOpen } = useDisclosure()
  let navigate = useNavigate()

  const handleSignOut = () => {
    // delete token from local storage
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      // reset
      setAuthToken({
        accessToken: '',
        email: '',
        picture: '',
        expiresIn: 0,
        expiresAt: 0,
        tokenType: '',
      })
    }

    // navigate to home page
    onClose()
    navigate('/home')
  }

  return (
    <HStack>
      {authToken.accessToken ? (
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          closeOnBlur={true}
          placement='bottom-start'
        >
          <PopoverTrigger>
            <Avatar
              name={authToken.email}
              src={authToken.picture}
              size='sm'
              cursor='pointer'
            />
          </PopoverTrigger>

          <PopoverContent boxShadow={'md'}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight='bold'>{authToken.email}</PopoverHeader>
            <PopoverBody>
              <Button onClick={handleSignOut} colorScheme='pink'>
                Sign Out
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <SignInButton />
      )}
    </HStack>
  )
}

ProfileManagementIcon.propTypes = {}
