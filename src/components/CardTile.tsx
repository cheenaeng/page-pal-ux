import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { Image, VStack, Text, Box, Link } from "@chakra-ui/react"
import { IBookmark } from "../types/saves"
import {
  AiOutlineDelete,
  AiOutlineFolderOpen,
  AiOutlineUndo,
} from "react-icons/ai"
import DeleteModal from "./views/saves/DeleteModal"
import ArchiveModal from "./views/saves/ArchiveModal"
import BookmarkAPI from "../api/BookmarkAPI"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../api/context/authContext"
import toast from "react-hot-toast"
import { BookmarkContext } from "../api/context/bookmarkContext"
import { ArchiveBookmarkContext } from "../api/context/archiveBookmarkContext"

interface PageProps {
  page: IBookmark
}

export const CardTile: React.FC<PageProps> = ({ page }: PageProps) => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure()

  const {
    isOpen: isArchiveModalOpen,
    onOpen: openArchiveModal,
    onClose: closeArchiveModal,
  } = useDisclosure()

  const { refetchBookmarkData } = useContext(BookmarkContext)
  const { refetchArchiveBookmarkData } = useContext(ArchiveBookmarkContext)
  const { mutate: deleteBookmark, isLoading: isDeleteModalLoading } =
    useMutation(BookmarkAPI.delBookmark)
  const { mutate: archiveBookmark, isLoading: isArchiveModalLoading } =
    useMutation(BookmarkAPI.archiveBookmark)
  const { mutate: restoreArchivedBookmark } = useMutation(
    BookmarkAPI.restoreArchivedBookmark,
  )
  const { authToken } = useContext(AuthContext)

  const handleDelete = () => {
    deleteBookmark(
      {
        id: page.id,
        token: authToken.accessToken ?? "",
      },
      {
        onSuccess: () => {
          closeDeleteModal()
          toast.success("Url deleted!")
          refetchBookmarkData()
        },
        onError: () => {
          toast.error("Error deleting url!")
        },
      },
    )
  }

  const handleArchive = () => {
    if (page.archived) {
      restoreArchivedBookmark(
        {
          id: page.id,
          token: authToken.accessToken ?? "",
        },
        {
          onSuccess: () => {
            closeArchiveModal()
            toast.success("Restored!")
            refetchArchiveBookmarkData()
          },
          onError: () => {
            toast.error("Error restoring bookmark!")
          },
        },
      )
    } else {
      archiveBookmark(
        {
          id: page.id,
          token: authToken.accessToken ?? "",
        },
        {
          onSuccess: () => {
            closeArchiveModal()
            toast.success("Archived!")
            refetchBookmarkData()
          },
          onError: () => {
            toast.error("Error archiving bookmark!")
          },
        },
      )
    }
  }

  return (
    <>
      {/* DIALOGS HERE */}
      <DeleteModal
        handleDelete={handleDelete}
        closeModal={closeDeleteModal}
        isModalOpen={isDeleteModalOpen}
        isDeleteModalLoading={isDeleteModalLoading}
      />
      <ArchiveModal
        handleArchive={handleArchive}
        closeModal={closeArchiveModal}
        isModalOpen={isArchiveModalOpen}
        isArchiveModalLoading={isArchiveModalLoading}
        isArticleArchived={page.archived === true}
      />

      {/* Main component */}
      <Card
        variant="custom"
        sx={{
          width: "100%",
          mx: "auto",
        }}
      >
        <Link
          sx={{
            textDecoration: "none",
            _hover: "none",
            _focus: "none",
            _active: "none",
            _visited: "none",
          }}
          href={`${page.link}`}
          isExternal
        >
          <CardBody>
            <Box
              position="relative"
              w="100%"
              h="auto"
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                height="18vh"
                width="100%"
                objectFit="cover"
                src={
                  "https://images.unsplash.com/photo-1548263594-a71ea65a8598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
                }
                alt={"boilerplate-image"}
                borderRadius="lg"
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bg="rgba(0, 0, 0, 0.5)"
                opacity="0"
                transition="opacity 0.3s ease"
                borderRadius="md"
                _hover={{ opacity: 1 }}
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textStyle={"body1Semi"}
              >
                View article
              </Box>
            </Box>

            <VStack mt="2" p="2" align="start" maxW="sm">
              {/* Title */}
              <Text
                textStyle="cardTitle"
                align="start"
                as="b"
                overflowWrap={"break-word"}
                noOfLines={1}
                color="brand.dark"
              >
                {page.title}
              </Text>
              {/* domain/link */}
              <Text
                textStyle="cardBody"
                align="start"
                overflowWrap={"break-word"}
                noOfLines={1}
                maxWidth="100%"
                isTruncated={true}
                as="b"
                color="brand.main"
              >
                {page.domain ? page.domain : page.link}
              </Text>
              {/* Length of article */}
              {/* temp comment out hardcoded article length */}
              {/* <Text textStyle="cardBody" align="start" color="gray.500">
                15 min
              </Text> */}
            </VStack>
          </CardBody>
        </Link>
        <CardFooter justifyContent="flex-end">
          <HStack>
            <IconButton
              variant="actionIcon"
              aria-label="archive"
              icon={
                page.archived ? (
                  <AiOutlineUndo size={18} />
                ) : (
                  <AiOutlineFolderOpen size={18} />
                )
              }
              name="archive-action"
              onClick={openArchiveModal}
            />

            <IconButton
              variant="actionIcon"
              aria-label="delete article"
              icon={<AiOutlineDelete size={18} />}
              name="delete-action"
              onClick={openDeleteModal}
            />
          </HStack>
        </CardFooter>
      </Card>
    </>
  )
}
