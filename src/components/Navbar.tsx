import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Link } from 'react-router-dom'

const NavLinks = [
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'Saves',
    path: '/saves',
  },
  {
    name: 'Archives',
    path: '/archives',
  },
  {
    name: 'My Stats',
    path: '/stats',
  },
]

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Box as="section" pb={{ base: '2', md: '2' }}>
      <Box as="nav" bg="bg.surface" boxShadow="sm">
        <Container py={{ base: '2', lg: '2' }}>
          <HStack spacing="2" justify="space-between">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                {/* Menus */}
                <ButtonGroup variant="text" colorScheme="gray" spacing="8">
                  {NavLinks.map((item) => (
                    <Button key={item.name} as={Link} to={item.path}>
                      {item.name}
                    </Button>
                  ))}
                </ButtonGroup>

                {/* Sign in/ up */}
                <HStack spacing="3" justifySelf="flex-end">
                  <Button variant="tertiary">Sign in</Button>
                  <Button variant="primary">Sign up</Button>

                  {/* Light/dark mode */}
                  <ColorModeSwitcher />
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="tertiary"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}
