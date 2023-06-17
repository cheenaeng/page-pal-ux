import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  borderRadius: 0, // disable the border radius
  fontWeight: 'normal', // change the font weight to normal
})

// Defining a custom variant
const fancy = defineStyle(() => {
  return {
    bg: `brand.main`,
    fontWeight: 'semibold',
    color: 'white',
    borderRadius: '3xl',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _dark: {
      bg: `brand.light`,
      color: 'gray.800',
    },

    _hover: {
      transform: 'scale(1.05, 1.05)',
      bg: `brand.main800`,

      _dark: {
        bg: `brand.light`,
      },
    },

    _active: {
      bg: `brand.main800`,
      transform: 'scale(1, 1)',

      _dark: {
        bg: `brand.400`,
      },
    },
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    fancy: fancy,
  },
})
