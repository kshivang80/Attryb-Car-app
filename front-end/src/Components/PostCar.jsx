import React, { useState } from 'react'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Searchbar } from '../Pages/Searchbar';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';

const initialData = {
  title: "",
  km: "",
  majorScratches: "",
  originalPaint: "",
  price: "",
  accidents: "",
  prevBuyers: "",
  image: "",
  desc: "",
  originalData: "",

}

const PostCar = () => {
  const [serachDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [newcardid, setNewCardID] = useState("")
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const toast = useToast()

  const auth = useSelector((state) => state.auth);
  console.log(auth.token, "message in signup")


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    formData.originalData = newcardid.id

    axios.post(`https://odd-lime-chicken-wrap.cyclic.app/old/addinventry`, formData, {
      headers: {
        "Content-type": "application/json",
        "Authorization": auth.token
      }
    })
      .then((res) => {
        let data = res.data;
        console.log(data, "posting")
        //setFormData(initialData)
        toast({
          title: 'Post Successful',
          position: 'top',
          status: 'success',
          isClosable: true,
        })

      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
        toast({
          title: 'Post UnSuccessful',
          position: 'top',
          status: 'error',
          isClosable: true,
        })
      });

  };










  return (
    <div>


      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Add Your Car Details for Sale</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Searchbar
              sendSelected={(e) => setNewCardID(e)}
              serachDrawerOpen={serachDrawerOpen}
              setSearchDrawerOpen={(e) => setSearchDrawerOpen(e)}
            />

            <form onSubmit={handleSubmit}>


              <Stack spacing={4}>
                <FormControl id="title">
                  <FormLabel>Title</FormLabel>
                  <Input
                  type='text'
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </FormControl>
                <Flex
                  flexDirection={["column", "row"]}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  <Text as="b" fontSize={"20px"}>Car Model :</Text>
                  <Text
                    p={1}
                    pl={2}
                    pr={2}
                    borderRadius={4}
                    bg={!newcardid.nameofmodel ? "red" : "green"}
                    color="white"
                  >
                    {newcardid.nameofmodel ||
                      "Select your OEMS"}
                  </Text>
                  <Button
                    colorScheme="green"
                    onClick={() => setSearchDrawerOpen(true)}
                  >
                    <FaSearch />
                  </Button>
                </Flex>
                <FormControl id="km">
                  <FormLabel>Kilometer </FormLabel>
                  <Input
                   type='Number'
                    id="km"
                    name="km"
                    value={formData.km}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="majorScratches">
                  <FormLabel>Major Scratches</FormLabel>
                  <Input
                    type='text'
                    id="majorScratches"
                    name="majorScratches"
                    value={formData.majorScratches}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="originalPaint">
                  <FormLabel>Original Paint</FormLabel>
                  <Input
                    type='text'
                    id="originalPaint"
                    name="originalPaint"
                    value={formData.originalPaint}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="price">
                  <FormLabel>Price </FormLabel>
                  <Input
                    type='Number'
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </FormControl>


                <FormControl id="accidents">
                  <FormLabel>Accidents</FormLabel>
                  <Input
                    type='text'
                    id="accidents"
                    name="accidents"
                    value={formData.accidents}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="prevBuyers">
                  <FormLabel>Previous Buyers</FormLabel>
                  <Input
                    type='text'
                    id="prevBuyers"
                    name="prevBuyers"
                    value={formData.prevBuyers}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="image">
                  <FormLabel>Image Url</FormLabel>
                  <Input
                    type='text'
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="desc">
                  <FormLabel>Description</FormLabel>
                  <Input
                    type='text'
                    id="desc"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                  />
                </FormControl>

                <Stack spacing={10}>

                  <Button
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Post Data
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>

    </div>
  )
}

export default PostCar