import * as React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
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
  },
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box height="100vh" mx="auto" p={3} boxSizing="border-box">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWithNav />}>
            <Route path="home" element={<></>} />
            <Route path="saves" element={<SavePage />} />
            <Route path="archives" />
            <Route path="stats" />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  </ChakraProvider>
)
