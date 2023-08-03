import React, { useContext } from "react"

import { Layout } from "../../components/Layout"
import { CardTiles } from "../../components/CardTiles"
import { MdSort } from "react-icons/md"
import {
  Flex,
  Text,
  Box,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { ArchiveBookmarkContext } from "../../api/context/archiveBookmarkContext"

function ArchivePage() {
  const { allData } = useContext(ArchiveBookmarkContext)
  return (
    <Layout>
      <Box
        maxH="80%"
        mx="auto"
        maxWidth={{
          base: "100%",
          "2xl": "70%",
        }}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text textStyle="body2Semi" color="brand.main">
            Articles ({allData?.length ?? 0})
          </Text>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                fontWeight="bold"
                sx={{ borderRadius: "8px" }}
                aria-label="sort articles"
                rightIcon={<MdSort />}
              >
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem>By date</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Divider my={4} mx="auto" />
        {/* search bar here  */}
        <CardTiles pages={allData} />
      </Box>
    </Layout>
  )
}

export default ArchivePage
