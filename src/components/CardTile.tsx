import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { Image, VStack, Text, Box, Link } from '@chakra-ui/react'
import { IPage } from '../types/saves'
import { AiOutlineDelete, AiOutlineFolderOpen } from 'react-icons/ai'
import DeleteModal from './views/saves/DeleteModal'

interface PageProps {
  page: IPage
}

export const CardTile: React.FC<PageProps> = ({ page }: PageProps) => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal
  } = useDisclosure()

  return (
    <>
      {/* DIALOGS HERE */}
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
      />
      <Card
        variant='custom'
        sx={{
          width: '100%',
          mx: 'auto'
        }}
      >
        <Link
          sx={{
            textDecoration: 'none',
            _hover: 'none',
            _focus: 'none',
            _active: 'none',
            _visited: 'none'
          }}
          href={`${page.link}`}
          isExternal
        >
          <CardBody>
            <Box
              position='relative'
              w='100%'
              h='auto'
              borderRadius='md'
              overflow='hidden'
            >
              {page.img && (
                <Image
                  height='18vh'
                  width='100%'
                  objectFit='cover'
                  src={page.img.src}
                  alt={page.img.alt}
                  borderRadius='lg'
                />
              )}

              <Box
                position='absolute'
                top='0'
                left='0'
                w='100%'
                h='100%'
                bg='rgba(0, 0, 0, 0.5)'
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
                View article
              </Box>
            </Box>

            <VStack mt='2' p='2' align='start' maxW='sm'>
              {/* Title */}
              <Text
                textStyle='cardTitle'
                align='start'
                as='b'
                overflowWrap={'break-word'}
                noOfLines={1}
                color='brand.dark'
              >
                {page.title}
              </Text>
              <Text
                textStyle='cardBody'
                align='start'
                overflowWrap={'break-word'}
                noOfLines={1}
                as='b'
                color='brand.main'
              >
                {page.link}
              </Text>
              {/* Length of article */}
              {page.lengthMin && (
                <Text textStyle='cardBody' align='start' color='gray.500'>
                  {page.lengthMin} min
                </Text>
              )}
            </VStack>
          </CardBody>
        </Link>
        <CardFooter justifyContent='flex-end'>
          <HStack>
            <IconButton
              variant='actionIcon'
              aria-label='delete article'
              icon={<AiOutlineDelete size={18} />}
              name='delete-action'
              onClick={openDeleteModal}
            />
            <IconButton
              aria-label='archive'
              variant='actionIcon'
              icon={<AiOutlineFolderOpen size={18} />}
              name='archive-action'
            />
          </HStack>
        </CardFooter>
      </Card>
    </>
  )
}
