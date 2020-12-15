import React, { useEffect } from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/core";
import { NextPage } from "next";
import { Logo } from "../components/Logo";

import { useBgColor } from "../hooks/useBgColor";
import { useRouter } from "next/router";

const AddCommand: NextPage = () => {
  const bg = useBgColor();
  const router = useRouter();
  /*
  useEffect(() => {
    if (localStorage && !localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
*/
  const home = async() => {
      router.push("/");  
  };

  return (
    <>
      <Box
        pos="absolute"
        h="100vh"
        w="100vw"
      />
      <Box
        pos="relative"
        width="100vw"
        height="100vh"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box shadow="md" p="10" w="96%" h="94%" bg={bg} borderRadius="5px">
          {typeof window === "undefined" ? null : (
            <VStack spacing="20">
                <Button onClick={home}>Done</Button>
              <Heading as="h2" size="xl" fontSize="40px" color="orange.600">
              </Heading>
            </VStack>
          )}
        </Box>
        <Button onClick={home}>Ready for scan...</Button>
      </Box>
    </>
  );
};

export default AddCommand;
