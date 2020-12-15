import React from "react";

import { ChakraProvider, IconButton, useColorMode } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Toggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      position="absolute"
      top="0"
      left="0"
      zIndex="10"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      aria-label={colorMode === "light" ? "Dark mode" : "Light mode"}
      onClick={toggleColorMode}
      colorScheme="blue"
    />
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <Toggle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
