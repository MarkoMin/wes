import { Box, Heading, VStack, HStack } from "@chakra-ui/core";
import { LinkButton } from "chakra-next-link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useBgColor } from "../hooks/useBgColor";

import { useGoHomeIfLoggedIn } from "../hooks/useGoHomeIfLoggedIn";

const Home: NextPage = () => {
  const bg = useBgColor();
  const router = useRouter();

  const addCommand = async() => {
    router.push("/addCommand");
};

  return (
    <>
      <Box
        pos="absolute"
        h="100vh"
        w="100vw"
      ></Box>
      <Box
        pos="relative"
        width="100vw"
        height="100vh"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          shadow="md"
          p="10"
          bg={bg}
          borderRadius="5px"
          flexDir="column"
          alignItems="center"
          spacing="24"
        >
          <VStack p={["20", "30", "40", "50"]} spacing="24">
            <Heading as="h1" fontSize={["4em", "6em"]} color="blue.700">
              IR remote store
            </Heading>
            <LinkButton
              href="/addCommand"
              p="9"
              size="lg"
              transitionDuration="1s"
              colorScheme="orange"
              onClick={addCommand}
            >
              Add new command
            </LinkButton>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Home;
