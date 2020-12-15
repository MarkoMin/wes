import { useColorModeValue } from "@chakra-ui/core";

export const useBgColor = () => {
  const color = useColorModeValue("white", "gray.800");
  return color;
};
