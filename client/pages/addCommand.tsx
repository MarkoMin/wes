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
  
  useEffect(() =>  {
    fetch('/allCommands').then(res=>{
      return res.json()
    }).then(res => {
      setItems(res)
      setIsLoading(false);
    }).catch(e=> console.log(e))
  }, []);

  const deleteAll = async() => {
      await fetch(`/allCommands`,{
        method: "delete"
      })
      await fetch('/allCommands').then(res=>{
        return res.json()
      }).then(res => {
        setItems(res)
      }).catch(e=> console.log(e))
  };

  const command= async(com) => {
    fetch(`/specify/execute:`+com).then(res=>{
      return res.json()
    }).catch(e=> console.log(e))
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleDone =async () => {
    if(done){
      //posalji value na srv
    setIsLoading(true)
    await fetch(`/specify/scan:`+value).then(res=>{
      return res.json()
    }).catch(e=> console.log(e)) 
      setValue("")
    await fetch('/allCommands').then(res=>{
      return res.json()
    }).then(res => {
      setItems(res)
      setIsLoading(false);
    }).catch(e=> console.log(e))
    setEdit(false)
    setDone(false)
    } else{
      setEdit(true)
    setDone(true)
    }
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
      {items.map((item) => <Box><Button onClick={()=> command(item.index)}>{item.title}</Button></Box>)}
      </ul>
      {edit ? (<form>
        <label>
          Naziv:
          <input type="text" value={value} onChange={handleChange} required />
        </label>
      </form>): null}
      <Button onClick={handleDone}>{done ? "Snimi komandu" : "Dodaj"}</Button>

      <Button onClick={deleteAll}>Obrisi sve!</Button>
        </Box>
      </Box>
    </>
    )
  );
};

export default AddCommand;
