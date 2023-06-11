import * as React from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme
} from '@chakra-ui/react'
import { Logo } from './Logo'
import { Navbar } from './components/Navbar'
import { CardTile } from './components/CardTile'
import { Layout } from './components/Layout'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <Navbar />
        <Layout />
      </Grid>
    </Box>
  </ChakraProvider>
)
