import React, { useEffect, useState } from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/core";
import { NextPage } from "next";
import { Logo } from "../components/Logo";

import { useBgColor } from "../hooks/useBgColor";
import { useRouter } from "next/router";

const AddCommand: NextPage = () => {
  const bg = useBgColor();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(false);
  const [value, setValue] = useState("")
  
  useEffect(() => {
    fetch('/allCommands').then(res=>{
      setItems(res.json())
      setIsLoading(false);
    }).catch(e=> console.log(e))
  }, []);

  const home = async() => {
      router.push("/");  
  };

  const command= async(com) => {
    console.log(com)
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit =(event) => {
    //posalji na srv
    alert('A name was submitted: ' + value);
    event.preventDefault();
  }

  const handleDone =() => {
    //posalji value na srv
  }

  return (
    isLoading ? (<p>Loading is...</p>): (
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
        <ul>
      {items.map((item) => <Box><Button onClick={()=> command(item.command)}>item.Title</Button></Box>)}
      </ul>
      {edit ? <form onSubmit={handleSubmit}>
        <label>
          Naziv:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>: null}
      <Button onClick={handleDone}>{done ? "Snimi komandu" : "Dodaj"}</Button>
        </Box>
      </Box>
    </>
    )
  );
};

export default AddCommand;
