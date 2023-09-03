import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  useDisclosure,
  Tooltip,
  Stack,
  Heading,
  Button,
  Flex,
  Center,
  AspectRatio,
  Wrap,
  WrapItem,
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
import { BookmarkChangeContext } from '../api/context/bookmarkChangeContext'
import { formatAMPM } from '../helpers/utils'

interface PageProps {
  page: IBookmark
}

// this component is being used in both 'save' and 'archive' page
export const EditorCardPreview: React.FC<PageProps> = ({ page }: PageProps) => {
  return (
    <>
      {/* Main component */}
      <Card
        variant='custom'
        // minHeight={'25vh'}
        maxWidth={{
          base: '75%',
          sm: '75%',
          md: '90%',
          lg: '75%',
          xl: '75%',
        }}
        mx='auto'
        direction={{ base: 'column', sm: 'row' }}
      >
        {/* bookmark image preview */}
        <Box
          position='relative'
          borderRadius='md'
          overflow='hidden'
          w={{
            base: '30%',
            xl: '30%',
          }}
          // maxWidth={{
          //   base: '100%',
          //   sm: '100%',
          //   md: '100%',
          //   lg: '35%',
          //   xl: '35%',
          // }}
          // minWidth={{
          //   base: '100%',
          //   sm: '100%',
          //   md: '100%',
          //   lg: '30%',
          //   xl: '30%',
          // }}
        >
          <Link href={`${page.link}`} isExternal>
            {/* image */}
            {page.image ? (
              <Image
                height='100%' // stretch image vertically to fit
                objectFit='cover'
                src={page.image}
                alt={'boilerplate-image'}
                borderRadius='lg'
              />
            ) : (
              <Box
                bg={page.color ? page.color : '#bd88f7'}
                // w='100%'
                // h='18vh'
                height='100%' // stretch image vertically to fit
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
            {/* grey shade over image */}
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
              alignItems='center'
              justifyContent='center'
              textStyle={'body1Semi'}
            >
              <Wrap justify='center'>
                <WrapItem>
                  <Text textAlign='center' fontSize='xl'>
                    View article
                  </Text>
                </WrapItem>
                <WrapItem alignSelf={'center'}>
                  <FiExternalLink size={20} />
                </WrapItem>
              </Wrap>
            </HStack>
          </Link>
        </Box>

        {/* bookmark data/ metadata */}
        <CardBody
          w={{
            base: '30%',
            lg: '100%',
            xl: '100%',
          }}
        >
          <VStack p='2' align='start' maxW='100%'>
            {/* title */}
            <Text as='b' overflowWrap={'break-word'} noOfLines={1}>
              {page.title}
            </Text>
            {/* description */}
            <Text
              overflowWrap={'break-word'}
              noOfLines={2}
              textColor='blackAlpha.700'
            >
              {page.description || ''}
            </Text>
            {/* link */}
            <Flex alignItems={'center'}>
              {page.icon && (
                // <Center>
                <Center w='25px' h='25px'>
                  <Image objectFit='cover' src={page.icon} alt={'link-icon'} />
                </Center>
              )}
              <Text overflowWrap={'break-word'} noOfLines={1} as='p' ml={'2'}>
                {page.link}
              </Text>
            </Flex>

            {/* created date DD/MM/YYYY, HH:MM (am/pm)*/}
            <Text
              textStyle='cardBody'
              align='start'
              overflowWrap={'break-word'}
              noOfLines={1}
              fontSize={'md'}
              color='grey'
            >
              {`${new Date(
                page.createdAt || '',
              ).toLocaleDateString()}, ${formatAMPM(
                new Date(page.createdAt || ''),
              )}`}
            </Text>
          </VStack>
        </CardBody>

        {/* <CardFooter justifyContent='flex-end'></CardFooter> */}
      </Card>
    </>
  )
}
