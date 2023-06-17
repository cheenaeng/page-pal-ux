import React from 'react'
import { CardTile } from './CardTile'
import { Wrap, Grid, GridItem } from '@chakra-ui/react'
import { IPage } from '../types/saves'

interface PagesProps {
  pages: IPage[]
}

export const CardTiles: React.FC<PagesProps> = ({ pages }: PagesProps) => {
  return (
    <>
      <Grid
        gap={3}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
      >
        {pages.map((page: IPage) => (
          <GridItem colSpan={1} key={page.id}>
            <CardTile page={page} />
          </GridItem>
        ))}
      </Grid>
    </>
  )
}
