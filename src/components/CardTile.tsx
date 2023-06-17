import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
  Image,
  VStack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
  Link,
} from '@chakra-ui/react'
import { IPage } from '../types/saves'
interface PageProps {
  page: IPage
}

export const CardTile: React.FC<PageProps> = ({ page }: PageProps) => {
  return (
    <Card variant="custom">
      <Link
        sx={{
          textDecoration: 'none',
          _hover: 'none',
          _focus: 'none',
          _active: 'none',
          _visited: 'none',
        }}
        href={`https://${page.link}`}
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
              height="20vh"
              width="100%"
              objectFit="cover"
              src={page.img.src}
              alt={page.img.alt}
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
              textStyle={'body1Semi'}
            >
              View article
            </Box>
          </Box>
          <VStack mt="2" p="3" align="start" maxW="sm">
            {/* Title */}
            <Text
              textStyle="cardTitle"
              align="start"
              as="b"
              overflowWrap={'break-word'}
              noOfLines={1}
              color="brand.dark"
            >
              {page.title}
            </Text>

            <Text
              textStyle="cardBody"
              align="start"
              overflowWrap={'break-word'}
              noOfLines={1}
              as="b"
              color="brand.main"
            >
              {page.link}
            </Text>
            {/* Length of article */}
            <Text textStyle="cardBody" align="start" color="gray.500">
              {page.lengthMin} min
            </Text>
          </VStack>
        </CardBody>
      </Link>
    </Card>
  )
}
