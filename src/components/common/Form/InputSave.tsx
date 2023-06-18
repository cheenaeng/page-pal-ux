import React from 'react'

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

function InputSave() {
  return (
    <Stack>
      <InputGroup variant="custom" colorScheme="brand">
        <InputLeftAddon>Save URL:</InputLeftAddon>
        <Input placeholder="Save url" />
        <InputRightElement>
          <IconButton
            sx={{
              borderRadius: '50%',
            }}
            aria-label="Add url"
            icon={<AddIcon color="brand.main" />}
          />
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}

export default InputSave
