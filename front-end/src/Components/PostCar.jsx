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
} from '@chakra-ui/react';
import { Searchbar } from '../Pages/Searchbar';

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


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    formData.originalData = newcardid.id

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
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="km">
                  <FormLabel>Kilometer </FormLabel>
                  <Input
                    id="km"
                    name="km"
                    value={formData.km}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="majorScratches">
                  <FormLabel>Major Scratches</FormLabel>
                  <Input
                    id="majorScratches"
                    name="majorScratches"
                    value={formData.majorScratches}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="originalPaint">
                  <FormLabel>Original Paint</FormLabel>
                  <Input
                    id="originalPaint"
                    name="originalPaint"
                    value={formData.originalPaint}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="price">
                  <FormLabel>Price </FormLabel>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="accidents">
                  <FormLabel>Accidents</FormLabel>
                  <Input
                    id="accidents"
                    name="accidents"
                    value={formData.accidents}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="prevBuyers">
                  <FormLabel>Previous Buyers</FormLabel>
                  <Input
                    id="prevBuyers"
                    name="prevBuyers"
                    value={formData.prevBuyers}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="image">
                  <FormLabel>Image Url</FormLabel>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="desc">
                  <FormLabel>Description</FormLabel>
                  <Input
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