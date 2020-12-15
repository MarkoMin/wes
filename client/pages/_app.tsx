import React from "react";

import { ChakraProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
