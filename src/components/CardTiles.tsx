import React from 'react'
import { CardTile } from './CardTile'
import { Wrap, Box, Center, WrapItem, Container } from '@chakra-ui/react'
import { IPage } from './Layout'
import PropTypes from 'prop-types'

interface PagesProps {
  pages: IPage[]
}

export const CardTiles: React.FC<PagesProps> = ({ pages }: PagesProps) => {
  return (
    <Wrap spacing='30px' justify='start' padding={'10'}>
      {pages.map((page: IPage) => (
        <CardTile page={page} />
      ))}
    </Wrap>
  )
}
