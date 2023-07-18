import { Box, Button, Flex, Select, SimpleGrid, Text } from "@chakra-ui/react";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from "../Pages/Loader";
import OldCarsData from "../Pages/OldCarsData";


const Home = () => {
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");


  const auth = useSelector((state) => state.auth);
  console.log(auth.token, "message in signup")


  const getDatas = () => {

    
    axios.get(`https://odd-lime-chicken-wrap.cyclic.app/old/alldata?filter=${filter}&order=${order}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": auth.token
      }
    })
      .then((res) => {
        setLoading(true)
        //console.log(res.data, "inner");
        setData(res.data.oldcars)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      })
  }

console.log(data)

  useEffect(() => {
   
    getDatas()
  }, [filter, order]);

  //console.log(data, "shiva")



  return (
    <Box h="auto">
      <Box mt="40px">
        <SimpleGrid
          gap={5}
          fontSize={"15px"}
          fontWeight={500}
          color="white"
          width={"95%"}
          m="auto"
          columns={[1, 1, 2, 3]}
        >
          <Box borderRadius={5} p={2} >
            <Text width={"170px"} borderRadius={5} bg="green" m="auto" mb={2}>
              Sort Prices
            </Text>
            <Flex justifyContent={"space-around"}>
              <Button onClick={() => [setFilter("price"), setOrder("asc")]}>Low To High</Button>
              <Button onClick={() => [setFilter("price"), setOrder("desc")]}>High To Low</Button>
            </Flex>
          </Box>

          <Box borderRadius={5} p={2} >
            <Text width={"170px"} borderRadius={5} bg="green" m="auto" mb={2}>
              Sort Mileage
            </Text>

            <Flex justifyContent={"space-around"}>
              <Button onClick={() => [setFilter("milegeofmodel"), setOrder("asc")]}>Low To High</Button>
              <Button onClick={() => [setFilter("milegeofmodel"), setOrder("desc")]}>High To Low</Button>
            </Flex>
          </Box>

          <Box borderRadius={5} p={2} >
            <Text width={"170px"} borderRadius={5} bg="green" m="auto" mb={2}>
              Select Colors
            </Text>
            <Select
              color={"green"}
              placeholder="Select Colors"
              onChange={(e) => [setFilter("colorofmodel"), setOrder(e.target.value)]}
            >
              <option value="Red">Red</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="Pink">Pink</option>
              <option value="green">Green</option>
              <option value="green">Green</option>
              <option value="olive">Olive</option>
              <option value="tan">Tan</option>
              <option value="grey">Grey</option>
              <option value="purple">Purple</option>
              <option value="teal">Teal</option>
              <option value="yellow">Yellow</option>
            </Select>
          </Box>
        </SimpleGrid>

      </Box>

      <Box mt="40px">
        <SimpleGrid
          columns={[1, 1, 2, 3]}
          width={"95%"}
          margin={"auto"}
          fontSize="12px"
          fontWeight={400}
          mt={4}
          gap={3}

        >
         {data.length === 0 || loading ? (
          <>
            <Loader cardShow={true} />
            <Loader cardShow={true} />
            <Loader cardShow={true} />
            <Loader cardShow={true} />
          </>
        ) : (
          data &&
          data.map((el) => (
            <OldCarsData
              calldata={() => getDatas()}  //This prop is a function that triggers the getDatas() 
              currentFilter={filter}  //This prop likely passes the filter value
              key={el._id}  // React requires a unique key prop 
              {...el}  //This is the spread operator that passes all other properties of the el object as individual props
            />
          ))
        )}
        </SimpleGrid>

      </Box>

    </Box>
  )
}

export default Home