import { Flex, HStack, VStack, Heading, Avatar } from "@chakra-ui/core";
import React from "react";

export const Logo: React.FC = ({ children }) => {
  return (
    <Flex justify="space-between" w="100%">
      <HStack spacing="0">
        <Heading as="h1" size="xl" fontSize="60px" color="blue.700">
          Game
        </Heading>
        <Heading as="h1" size="xl" fontSize="60px" color="red.700">
          Ex
        </Heading>
      </HStack>

      <VStack>
        <Avatar
          size="md"
          bgColor="red.700"
          name={localStorage.getItem("username")}
        />
        {children}
      </VStack>
    </Flex>
  );
};
