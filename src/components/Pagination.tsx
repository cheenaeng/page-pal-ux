import React, { memo } from 'react'

import { Stack } from '@chakra-ui/react'
import { Paginate } from 'react-paginate-chakra-ui'
// import 'focus-visible'
// import './styles.css'

function Pagination(props: IPaginationProps) {
  const handlePageClick = (p: number) => {
    props.setPage(p)
  }

  return (
    <Stack p={5}>
      <Paginate
        // required props 👇
        page={props.page}
        count={props.count}
        pageSize={props.pageSize}
        onPageChange={handlePageClick}
        // optional props 👇
        margin={2}
        shadow='sm'
        variant='outline'
        border='1px solid'
        borderColor='gray.300'
        borderRadius={'10'}
        colorScheme='purple'
        color='black'
        maxWidth='10'
        _dark={{ color: 'white' }}
      />
    </Stack>
  )
}

interface IPaginationProps {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  count: number
}

export default memo(Pagination)
