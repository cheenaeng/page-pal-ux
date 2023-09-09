import React from "react";
import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import LandingPagePreview from "../Assets/LandingPagePreview.svg";

function HeroSection() {
  return (
    <Container maxW="container.lg">
      <Center p={4} minHeight="70vh">
        <VStack>
          <Container maxW="container.md" textAlign="center">
            <Heading size="2xl" mb={6}>
              PIXEL BOOK
            </Heading>
            <Heading
              size="xl"
              mb={2}
              // color="gray.700"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              Elevate Your Web Experience
            </Heading>

            <Text fontSize="lg" color="gray.500">
              {/* v1 */}
              {/* Seamlessly organize your bookmarks into a reading list, add custom
              tags for quick retrieval, and embrace the power of a Notion-style
              editor to craft detailed notes for each of your saved gems. */}
              {/* v2 */}
              Effortlessly organize, tag, and enrich your saved articles
            </Text>

            <Button
              mt={4}
              colorScheme="pink"
              onClick={() => {
                window.open("<https://launchman.com>", "_blank");
              }}
              isDisabled={true} // temp disabled till implemented
            >
              Reserve your username! (coming soon)
            </Button>

            {/* temp commented out (consider replacing with API when launch gain traction)  */}
            {/* <Text my={2} fontSize="sm" color="gray.500">
              102+ builders have signed up in the last 30 days
            </Text> */}
          </Container>
          <Image
            mt={"8"}
            // height="30vh"
            width="210vw"
            objectFit="contain"
            src={LandingPagePreview}
            alt={"image-depict-blank-slate"}
            borderRadius="lg"
            boxShadow={"lg"}
          />
        </VStack>
      </Center>
    </Container>
  );
}

export default HeroSection;
