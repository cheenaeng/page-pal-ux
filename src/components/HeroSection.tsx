import React from "react";
import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";
import LandingPagePreview from "../Assets/LandingPagePreview.svg";

function HeroSection() {
  return (
    <VStack minHeight="70vh" textAlign={"center"} py={"3"}>
      <Heading size="2xl" mb={2}>
        Linkt
      </Heading>
      <Heading
        size="xl"
        mb={2}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Elevate Your Web Experience
      </Heading>

      <Text fontSize="lg" color="gray.500" mb={2}>
        {/* v1 */}
        {/* Seamlessly organize your bookmarks into a reading list, add custom
              tags for quick retrieval, and embrace the power of a Notion-style
              editor to craft detailed notes for each of your saved gems. */}
        {/* v2 */}
        Effortlessly organize, tag, and enrich your saved articles
      </Text>

      <Button
        maxW={"80vw"}
        whiteSpace="normal"
        height="auto"
        blockSize="auto"
        colorScheme="pink"
        onClick={() => {
          window.open("<https://launchman.com>", "_blank");
        }}
        isDisabled={true} // temp disabled till implemented
      >
        <Text padding={2}>Reserve your username! (coming soon)</Text>
      </Button>

      {/* temp commented out (consider replacing with API when launch gain traction)  */}
      {/* <Text my={2} fontSize="sm" color="gray.500">
              102+ builders have signed up in the last 30 days
            </Text> */}
      <Image
        mt={"6"}
        // height="30vh"
        width="80vw"
        objectFit="cover"
        src={LandingPagePreview}
        alt={"preview"}
        borderRadius="lg"
        boxShadow={"lg"}
      />
    </VStack>
  );
}

export default HeroSection;
