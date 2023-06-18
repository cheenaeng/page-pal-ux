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

const actionIcon = defineStyle(() => {
  return {
    color: '#655bad',
    borderRadius: '50%',
    border: 'none',
    bg: 'rgba(221,216,254,0.4)',
    _hover: {
      bg: 'rgba(221,216,254,0.9)',
    },
    _dark: {
      bg: 'rgba(74,93,128,0.3)',
      color: 'rgba(221,216,254,0.3)',
      _hover: {
        bg: 'rgba(74,93,128,0.5)',
      },
    },
  }
})

const primary = defineStyle(() => {
  return {
    color: '#f7f7f7',
    borderRadius: '8px',
    border: 'none',
    bg: '#7c70d2',
    _hover: {
      bg: `brand.main800`,
    },
    _dark: {
      bg: 'rgba(74,93,128,0.3)',
      color: 'rgba(221,216,254,0.5)',
      _hover: {
        bg: 'rgba(74,93,128,0.5)',
      },
    },
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    fancy: fancy,
    actionIcon: actionIcon,
    primary: primary,
  },
})
