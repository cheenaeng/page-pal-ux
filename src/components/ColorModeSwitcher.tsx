import * as React from 'react'
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react'
// import { FaMoon, FaSun } from 'react-icons/fa'
import { HiOutlineSun, HiMoon } from 'react-icons/hi'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(HiOutlineSun, HiMoon)

  return (
    <IconButton
      fontSize='lg'
      variant='ghost'
      color='current'
      onClick={toggleColorMode}
      icon={<SwitchIcon size={25} />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}
