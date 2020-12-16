import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Input, Spinner, HStack } from "@chakra-ui/core";
import { NextPage } from "next";
import { Logo } from "../components/Logo";


import { useBgColor } from "../hooks/useBgColor";
import { useRouter } from "next/router";
import { Container } from "next/app";

const AddCommand: NextPage = () => {
  const bg = useBgColor();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(false);
  const [value, setValue] = useState("")

  useEffect(() => {
    fetch('/allCommands').then(res => {
      return res.json()
    }).then(res => {
      setItems(res)
      setIsLoading(false);
    }).catch(e => console.log(e))
  }, []);

  const deleteAll = async () => {
    await fetch(`/allCommands`, {
      method: "delete"
    })
    await fetch('/allCommands').then(res => {
      return res.json()
    }).then(res => {
      setItems(res)
    }).catch(e => console.log(e))
  };

  const command = async (com) => {
    fetch(`/specify/execute:` + com).then(res => {
      return res.json()
    }).catch(e => console.log(e))
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleDone = async () => {
    if (done) {
      //posalji value na srv
      setIsLoading(true)
      await fetch(`/specify/scan:` + value).then(res => {
        return res.json()
      }).catch(e => console.log(e))
      setValue("")
      await fetch('/allCommands').then(res => {
        return res.json()
      }).then(res => {
        setItems(res)
        setIsLoading(false);
      }).catch(e => console.log(e))
      setEdit(false)
      setDone(false)
    } else {
      setEdit(true)
      setDone(true)
    }
  }

  return (
    isLoading ? (
      <Box
        pos="relative"
        width="100vw"
        height="100vh"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    ) : (
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
            <Box d="flex" alignItems="center" justifyContent="space-around" flexDirection="column">
              <Box
                flexDirection="row">
                <HStack spacing="24px">
                  {items.map((item) => <Box mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    <Button size="lg" colorScheme="teal" variant="outline" onClick={() => command(item.index)}>{item.title}</Button>
                  </Box>)}
                  </HStack>
              </Box>
              {edit ? (
                <Input
                  placeholder="Unesite ime komande" 
                  size="lg"
                  isFullWidth={false}
                  isRequired={true}
                  value={value}
                  onChange={handleChange}
                  style={{margin:20}}
                  width="25vw"
                  >
                </Input>
              ) : null}
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                flexDirection="row"
                isTruncated
              >
                <Button style={!done ? { margin: 30, color: 'white', background: 'green', width:140, height:100,fontSize:30, borderRadius:10 } : { margin: 30, color: 'white', background: 'green', width:140, height:100, borderRadius:10} } onClick={handleDone}>{done ? "Snimi komandu" : "Dodaj"}</Button>
                <Button style={{ margin:30 ,color: 'white', background: 'red', width:140, height:100, fontSize:30, borderRadius:10 }} onClick={deleteAll}>Obriši</Button>
              </Box>



            </Box>
          </Box>
        </>
      )
  );
};

export default AddCommand;
