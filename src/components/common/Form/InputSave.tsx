import React, { useState } from 'react'

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import BookmarkAPI from '../../../api/BookmarkAPI'
import { useMutation } from '@tanstack/react-query'
import LoadingOverlay from 'react-loading-overlay'
import toast from 'react-hot-toast'
function InputSave() {
  const { mutate: addBookmark, isLoading: isAddingLoading } = useMutation(
    BookmarkAPI.addBookmark
  )
  const [inputUrl, setInputUrl] = useState('')

  const addUrl = () => {
    toast.promise(BookmarkAPI.addBookmark({ link: inputUrl }), {
      loading: 'Saving url...',
      success: 'Url saved!',
      error: 'Error saving url!',
    })

    addBookmark(
      {
        link: inputUrl,
      },
      {
        onSettled: () => {
          setInputUrl('')
        },
      }
    )
  }

  return (
    <>
      <Stack>
        <InputGroup variant="custom" colorScheme="brand">
          <InputLeftAddon>Save URL:</InputLeftAddon>
          <Input
            value={inputUrl}
            placeholder="Save url"
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              sx={{
                borderRadius: '50%',
              }}
              onClick={addUrl}
              aria-label="Add url"
              icon={<AddIcon color="brand.main" />}
            />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <LoadingOverlay active={isAddingLoading} spinner text="Saving url..." />
    </>
  )
}

export default InputSave
