import React from 'react'
import { Box, VStack } from '@chakra-ui/react'

export const Layout = (props: LayoutProps) => {
  const { children } = props
  return (
    <VStack p="10">
      {/* header section  */}
      <Box width={'100%'}>
        <>{children}</>
      </Box>
    </VStack>
  )
}

interface LayoutProps {
  children: React.ReactNode
}
