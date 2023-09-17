import React from "react";
import { CardTile } from "./CardTile";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { IBookmark } from "../types/saves";
import { ListTile } from "./ListTile";

interface PagesProps {
  pages: IBookmark[] | undefined;
  isLoading: boolean;
}

export const ListTiles: React.FC<PagesProps> = ({
  pages,
  isLoading,
}: PagesProps) => {
  const generateSkeletonTiles = () => {
    const tiles = [];
    for (let i = 0; i < 9; i++) {
      tiles.push(
        <GridItem colSpan={1} key={i}>
          <Skeleton sx={{ borderRadius: "8px" }} height="300px" width="300px" />
        </GridItem>
      );
    }
    return tiles;
  };

  const boilerCards = generateSkeletonTiles();

  return (
    <VStack alignItems={"center"} textAlign={"start"}>
      {!isLoading && pages
        ? pages.map((page) => (
            <GridItem key={page.id}>
              <ListTile page={page} />
            </GridItem>
          ))
        : boilerCards}
    </VStack>
  );
};
