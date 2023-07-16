import React, { useContext, useEffect, useState } from 'react'

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
import toast from 'react-hot-toast'
import { AuthContext } from '../../../api/context/authContext'
import { BookmarkContext } from '../../../api/context/bookmarkContext'
function InputSave() {
  const { accessToken } = useContext(AuthContext)
  const bearerToken = accessToken ?? ''
  const { refetchData } = useContext(BookmarkContext)
  const { mutate: addBookmark, isLoading: isAddingLoading } = useMutation(
    BookmarkAPI.addBookmark
  )
  const [inputUrl, setInputUrl] = useState('')
  const [loadingToastId, setLoadingToastId] = useState('')

  const addUrl = () => {
    addBookmark(
      {
        link: inputUrl,
        token: bearerToken,
      },
      {
        onSuccess: () => {
          toast.success('Url saved!')
          refetchData()
        },
        onError: () => {
          toast.error('Error saving url!')
        },
        onSettled: () => {
          setInputUrl('')
        },
      }
    )
  }

  useEffect(() => {
    if (isAddingLoading) {
      const loadingToast = toast.loading('Saving url...')
      setLoadingToastId(loadingToast)
    } else {
      toast.dismiss(loadingToastId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingLoading])

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
    </>
  )
}

export default InputSave
