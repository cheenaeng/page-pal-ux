import React from 'react'
import { Box, VStack } from '@chakra-ui/react'

export const Layout = (props: LayoutProps) => {
  const { children } = props
  return (
    <Box>
      <VStack p="2">
        {/* header section  */}
        <Box width={'100%'}>
          <>{children}</>
        </Box>
      </VStack>
    </Box>
  )
}

interface LayoutProps {
  children: React.ReactNode
}
