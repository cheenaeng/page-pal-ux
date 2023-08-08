import { useState, useContext } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useBreakpointValue,
  Avatar,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Link } from 'react-router-dom'
import InputSave from './common/Form/InputSave'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { AuthContext } from '../api/context/authContext'
import { useNavigate } from 'react-router-dom'
import { SignInButton } from './SignInButton'

const NavLinks = [
  {
    requireAuth: true,
    name: 'Home',
    path: '/home',
  },
  {
    requireAuth: true,
    name: 'Saves',
    path: '/saves',
  },
  {
    requireAuth: true,
    name: 'Archives',
    path: '/archives',
  },
  // {
  // requireAuth: true,
  //   name: "My Stats",
  //   path: "/stats",
  // },
]

export const Navbar = () => {
  const { authToken, setAuthToken } = useContext(AuthContext)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const { onOpen, onClose, isOpen } = useDisclosure()
  let navigate = useNavigate()

  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput)
  }

  const isDesktop = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
  })

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
    <Box as='section' py={{ base: '2', md: '2' }} boxShadow='sm'>
      {isDesktop ? (
        <HStack minWidth='800px'>
          {/* Menus */}
          <ButtonGroup
            variant='text'
            spacing={{
              base: 2,
              lg: 2,
              xl: 4,
              '2xl': 8,
            }}
            mx='auto'
          >
            {/* hide nav menus if they require auth and user is not logged in */}
            {NavLinks.map((item) =>
              item.requireAuth && !authToken.accessToken ? (
                <></>
              ) : (
                <Button
                  fontSize='md'
                  fontWeight='bold'
                  key={item.name}
                  as={Link}
                  to={item.path}
                  variant='ghost'
                >
                  {item.name}
                </Button>
              ),
            )}
          </ButtonGroup>

          {/* add url input bar */}
          {authToken.accessToken && (
            <HStack minWidth='40vw' justifyContent='flex-end'>
              {showUrlInput ? (
                <HStack>
                  <InputSave setShowUrlInput={setShowUrlInput} />
                  <IconButton
                    variant='ghost'
                    sx={{
                      borderRadius: '50%',
                    }}
                    aria-label='hide url input'
                    onClick={toggleUrlInput}
                    icon={<CloseIcon />}
                  />
                </HStack>
              ) : (
                <Box>
                  <Button
                    onClick={toggleUrlInput}
                    variant='fancy'
                    rightIcon={<AddIcon />}
                  >
                    Add url
                  </Button>
                </Box>
              )}
            </HStack>
          )}

          {/* Sign in/ out */}
          {authToken.accessToken ? (
            <HStack justifySelf='flex-end' mx='1'>
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
                  <PopoverHeader fontWeight='bold'>
                    {authToken.email}
                  </PopoverHeader>
                  <PopoverBody>
                    <Button onClick={handleSignOut} colorScheme='pink'>
                      Sign Out
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          ) : (
            <HStack justifySelf='flex-end'>
              <SignInButton />
            </HStack>
          )}

          {/* Light/dark mode */}
          <ColorModeSwitcher />
        </HStack>
      ) : (
        <HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              variant='tertiary'
              icon={<FiMenu fontSize='1.25rem' />}
              aria-label='Open Menu'
            />
            <MenuList>
              <MenuItem minH='48px' as={Link} to='/home'>
                Home
              </MenuItem>
              <MenuItem minH='48px' as={Link} to='/saves'>
                Saves
              </MenuItem>
              <MenuItem minH='48px' as={Link} to='/archives'>
                Archives
              </MenuItem>
              <MenuItem minH='48px'>Login/Logout</MenuItem>
            </MenuList>
          </Menu>
          <HStack justifyContent='flex-end'>
            <Popover>
              <PopoverTrigger>
                <Button
                  onClick={toggleUrlInput}
                  variant='fancy'
                  rightIcon={<AddIcon />}
                >
                  Add url
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <InputSave setShowUrlInput={setShowUrlInput} />
              </PopoverContent>
            </Popover>
          </HStack>
        </HStack>
      )}
    </Box>
  )
}
