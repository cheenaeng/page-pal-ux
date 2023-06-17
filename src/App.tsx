import * as React from 'react'
import { ChakraProvider, Box, Grid } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LayoutWithNav from './components/LayoutWithNav'
import SavePage from './pages/saves/SavePage'
import { extendTheme } from '@chakra-ui/react'
import { customColors } from './components/ui/colors'
import customBreakpoints from './components/ui/breakpoints'
import space from './components/ui/spacing'
import textStyles from './components/ui/textStyles'
import { inputTheme } from './components/common/Form/InputSave'

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
  },
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
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
      </Grid>
    </Box>
  </ChakraProvider>
)
