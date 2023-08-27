import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react'
import { Image, VStack, Text, Box, Link } from '@chakra-ui/react'
import { BookmarkStateEnum, IBookmark } from '../types/saves'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  AiOutlineDelete,
  AiOutlineFolderOpen,
  AiOutlineUndo,
  AiOutlineForm,
} from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import DeleteModal from './views/saves/DeleteModal'
import ArchiveModal from './views/saves/ArchiveModal'
import BookmarkAPI from '../api/BookmarkAPI'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../api/context/authContext'
import toast from 'react-hot-toast'
import { BookmarkContext } from '../api/context/bookmarkContext'
import { ArchiveBookmarkContext } from '../api/context/archiveBookmarkContext'

interface PageProps {
  page: IBookmark
}

// this component is being used in both 'save' and 'archive' page
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
        token: authToken.accessToken ?? '',
      },
      {
        onSuccess: () => {
          closeDeleteModal()
          toast.success('Url deleted!')

          // TODO @sb: propose a more elegant way to resolve this
          if (page.state === BookmarkStateEnum.ARCHIVED) {
            refetchArchiveBookmarkData()
          } else {
            refetchBookmarkData()
          }
        },
        onError: () => {
          toast.error('Error deleting url!')
        },
      },
    )
  }

  const handleArchive = () => {
    if (page.state === BookmarkStateEnum.ARCHIVED) {
      restoreArchivedBookmark(
        {
          id: page.id,
          token: authToken.accessToken ?? '',
        },
        {
          onSuccess: () => {
            closeArchiveModal()
            toast.success('Restored!')
            refetchArchiveBookmarkData()
          },
          onError: () => {
            toast.error('Error restoring bookmark!')
          },
        },
      )
    } else {
      archiveBookmark(
        {
          id: page.id,
          token: authToken.accessToken ?? '',
        },
        {
          onSuccess: () => {
            closeArchiveModal()
            toast.success('Archived!')
            refetchBookmarkData()
          },
          onError: () => {
            toast.error('Error archiving bookmark!')
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
        isArticleArchived={page.state === BookmarkStateEnum.ARCHIVED}
      />

      {/* Main component */}
      <Card
        variant='custom'
        sx={{
          width: '100%',
          mx: 'auto',
        }}
      >
        <CardBody>
          <Link
            sx={{
              textDecoration: 'none',
              _hover: 'none',
              _focus: 'none',
              _active: 'none',
              _visited: 'none',
            }}
            href={`${page.link}`}
            isExternal
          >
            <Box
              position='relative'
              w='100%'
              h='auto'
              borderRadius='md'
              overflow='hidden'
            >
              {page.image ? (
                <Image
                  height='18vh'
                  width='100%'
                  objectFit='cover'
                  src={page.image}
                  alt={'boilerplate-image'}
                  borderRadius='lg'
                />
              ) : (
                <Box
                  bg={page.color ? page.color : '#bd88f7'}
                  w='100%'
                  h='18vh'
                  display='flex'
                  alignItems='center'
                  pl='5'
                  pt='10'
                  color='white'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='190'
                  textTransform='uppercase'
                >
                  {page?.domain?.charAt(0) || 'P'}
                </Box>
              )}
              <HStack
                position='absolute'
                top='0'
                left='0'
                w='100%'
                h='100%'
                bg='rgba(0, 0, 0, 0.7)'
                opacity='0'
                transition='opacity 0.3s ease'
                borderRadius='md'
                _hover={{ opacity: 1 }}
                color='white'
                display='flex'
                alignItems='center'
                justifyContent='center'
                textStyle={'body1Semi'}
              >
                <Text fontSize='2xl'>View article</Text>
                <FiExternalLink size={20} />
              </HStack>
            </Box>
          </Link>

          <VStack mt='2' p='2' align='start' maxW='90%'>
            {/* Title */}
            <Tooltip
              label={page.title}
              borderRadius={4}
              hasArrow
              arrowSize={8}
              openDelay={500} // 0.2s delay
            >
              <Text
                textStyle='cardTitle'
                align='start'
                overflowWrap={'break-word'}
                noOfLines={1}
                color='brand.dark'
              >
                {page.title}
              </Text>
            </Tooltip>

            {/* domain/link */}
            <Text
              textStyle='cardBody'
              align='start'
              overflowWrap={'break-word'}
              noOfLines={1}
              color='brand.main'
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

        <CardFooter justifyContent='flex-end'>
          <HStack>
            <Tooltip label='Notes' borderRadius={4} hasArrow arrowSize={8}>
              <IconButton
                as={ReactRouterLink}
                to={`note/${page.id}`}
                variant='actionIcon'
                aria-label='note'
                icon={<AiOutlineForm size={18} />}
                name='note-action'
              />
            </Tooltip>
            <Tooltip label='Archive' borderRadius={4} hasArrow arrowSize={8}>
              <IconButton
                variant='actionIcon'
                aria-label='archive'
                icon={
                  page.state === BookmarkStateEnum.ARCHIVED ? (
                    <AiOutlineUndo size={18} />
                  ) : (
                    <AiOutlineFolderOpen size={18} />
                  )
                }
                name='archive-action'
                onClick={openArchiveModal}
              />
            </Tooltip>
            <Tooltip label='Delete' borderRadius={4} hasArrow arrowSize={8}>
              <IconButton
                variant='actionIcon'
                aria-label='delete article'
                icon={<AiOutlineDelete size={18} />}
                name='delete-action'
                onClick={openDeleteModal}
              />
            </Tooltip>
          </HStack>
        </CardFooter>
      </Card>
    </>
  )
}
