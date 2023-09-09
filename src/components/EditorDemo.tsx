import {
  Box,
  Center,
  Container,
  Wrap,
  WrapItem,
  Text,
  Image,
  VStack,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import TiptapDemoInstance from "./TiptapDemoInstance";

const EditorDemo: React.FC = () => {
  return (
    <Container
      mt={"8"}
      bg={"white"}
      _dark={{ bg: "#000" }}
      maxW="90%"
      centerContent
      py={[8, 16]}
      borderRadius={"lg"}
    >
      <VStack minHeight="35vh">
        <Heading size="xl" mb={6} textAlign={"center"}>
          Notion-Style Rich Text Editor
        </Heading>
        <TiptapDemoInstance />
      </VStack>
    </Container>
  );
};

export default EditorDemo;
