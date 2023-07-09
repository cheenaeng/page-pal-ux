import * as React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import LayoutWithNav from './components/LayoutWithNav'
import SavePage from './pages/saves/SavePage'
import { extendTheme } from '@chakra-ui/react'
import { customColors } from './components/ui/colors'
import customBreakpoints from './components/ui/breakpoints'
import space from './components/ui/spacing'
import textStyles from './components/ui/textStyles'
import { inputTheme } from './components/ui/customComponents/input'
import { cardTheme } from './components/ui/customComponents/card'
import { buttonTheme } from './components/ui/customComponents/button'
import HomePage from './pages/home/HomePage'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const theme = extendTheme({
  colors: customColors,
  breakpoints: customBreakpoints,
  space: space,
  textStyles: textStyles,
  fonts: {
    heading: `'Montserrat',sans-serif`,
    body: `'Montserrat',sans-serif`,
  },
  components: {
    Input: inputTheme,
    Card: cardTheme,
    Button: buttonTheme,
    IconButton: buttonTheme,
  },
})

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box height="100vh" mx="auto" p={3} boxSizing="border-box">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LayoutWithNav />}>
                <Route index element={<Navigate to="/home" />} />
                <Route path="home" element={<HomePage />} />
                <Route path="saves" element={<SavePage />} />
                <Route path="archives" />
                <Route path="stats" />
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
