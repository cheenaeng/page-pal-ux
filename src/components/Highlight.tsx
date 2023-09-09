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
} from "@chakra-ui/react";

import { IHighlightType } from "../types";

interface HighlightProps {
  highlights: IHighlightType[];
}

const Highlight: React.FC<HighlightProps> = ({
  highlights,
}: HighlightProps) => {
  return (
    <Box bg="gray.50">
      <Container maxW="container.md" centerContent py={[8, 28]}>
        <SimpleGrid spacingX={10} spacingY={20} minChildWidth="300px">
          {highlights.map(({ title, description, icon }, i: number) => (
            <Box p={4} rounded="md" key={`highlight_${i}`}>
              <Text fontSize="4xl">{icon}</Text>

              <Text fontWeight={500}>{title}</Text>

              <Text color="gray.500" mt={4}>
                {description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Highlight;
