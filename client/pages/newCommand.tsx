import React, { useEffect, useState } from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/core";
import { NextPage } from "next";
import { Logo } from "../components/Logo";

import { useBgColor } from "../hooks/useBgColor";
import { useRouter } from "next/router";

const AddCommand: NextPage = () => {
  const bg = useBgColor();
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(true);
  
  return (
    isLoading ? (<p>Press command on your remote!</p>): null
  );
};

export default AddCommand;
