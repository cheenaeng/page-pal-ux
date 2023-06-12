import * as React from 'react'
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LayoutWithNav from './components/LayoutWithNav'
import SavePage from './pages/saves/SavePage'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutWithNav />}>
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
