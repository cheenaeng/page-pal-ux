import React from 'react'
import { inputAnatomy as parts } from '@chakra-ui/anatomy'

import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { AddIcon } from '@chakra-ui/icons'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

// Defining a custom variant
const variantCustom = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    field: {
      boxShadow: 'md',
      border: '0px solid',
      bg: 'gray.50',
      borderTopRightRadius: 'full',
      borderBottomRightRadius: 'full',
      _dark: {
        bg: 'whiteAlpha.50',
      },

      _hover: {
        bg: 'gray.200',
        _dark: {
          bg: 'whiteAlpha.100',
        },
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _focusVisible: {
        bg: 'gray.200',
        _dark: {
          bg: 'whiteAlpha.100',
        },
      },
    },
    addon: {
      boxShadow: 'sm',
      border: '0px solid',
      borderColor: 'transparent',
      borderTopLeftRadius: 'full',
      borderBottomLeftRadius: 'full',
      bg: `${c}.main`,
      color: 'white',
      _dark: {
        bg: `${c}.main`,
        color: `white`,
      },
    },
    element: {
      bg: 'gray.50',
      rounded: 'full',
      border: 'transparent',
      borderColor: 'transparent',
      _dark: {
        bg: 'whiteAlpha.50',
        borderColor: 'whiteAlpha.100',
      },
    },
  }
})

const variants = {
  custom: variantCustom,
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'custom',
  },
})

function InputSave() {
  return (
    <Stack>
      <InputGroup variant="custom" colorScheme="brand">
        <InputLeftAddon>Quick Save:</InputLeftAddon>
        <Input placeholder="Save url" />
        <InputRightElement>
          <AddIcon color="brand.light" />
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}

export default InputSave
