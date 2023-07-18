import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Box, Flex, Select, SimpleGrid, Text,Image,Button, useToast, } from "@chakra-ui/react";
import axios from 'axios';
import { EditForm } from './EditForm';
import jwtDecode from 'jwt-decode';

const OldCarsData = ({
    originalData,
    km,
    desc,
    price,
    image,
    _id,
    accidents,
    prevBuyers,
    userID,
    originalPaint,
    majorScratches,
    title,
    calldata,
    currentFilter,
}) => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const auth = useSelector((store) => store.auth);
    //console.log(auth.user, "new file")
    const [loading, setLoading] = useState(false);
    const toast=useToast()
      console.log(currentFilter,"currentFilter")
    //  const token = localStorage.getItem('token') || "";
    //  const decoded = jwtDecode(token);
    //  console.log(decoded.userID,"decorded data")

    const authToken = localStorage.getItem('authToken') 
    console.log(authToken,"token check")
    const decoded = auth.token ? jwtDecode(auth.token) : { userID: null };

    const handleDelete = (id) => {
        setLoading(true);

        axios.delete(`https://odd-lime-chicken-wrap.cyclic.app/old/delete/${id}`, {
            headers: {
              "Content-type": "application/json",
              "Authorization": auth.token
            }
          })
            .then((response) => {
                toast({
                    title: 'Delete Successful',
                    position: 'top',
                    status: 'success',
                    isClosable: true,
                  })
                let data = response.data;
                
                setLoading(false);
                calldata()
                
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
            });
    };



    return (
        <Box
            height="auto"
            width="90%"
            fontSize={"15px"}
            _hover={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;` }}
            cursor={"pointer"}
            m="auto"
            textAlign={"center"}
            borderRadius={4}
            //border="1px solid red"
            p={4}
           
        >
            <center>
                <Image
                    textAlign={"center"}
                    height={250}
                    borderRadius={5}
                    src={image}
                    width={"100%"}
                />
            </center>
            <SimpleGrid mt="8px" gap={2} columns={[2, 4]}>
                {originalData.colorofmodel.map((el) => (
                    <Button
                        key={Math.random() * 34343}
                        pr={2}
                        pl={2}
                       color={el}
                        textAlign={"center"}
                        borderRadius={4}
                       bg="teal.100"
                    >
                      {el}
                    </Button>
                ))}
            </SimpleGrid>
            <Text><span style={{fontWeight:"bold"}}>Title :</span> {title}</Text>
            <Text><span style={{fontWeight:"bold"}}>Name :</span> {originalData.nameofmodel}</Text>
            <Text><span style={{fontWeight:"bold"}}>Year :</span> : {originalData.yearofmodel}</Text>
          
            <Text
                style={
                    currentFilter === "price"
                        ? {
                            
                           
                            color: "green",
                            padding: "5px",
                            borderRadius: "5px",
                            margin: "5px",
                        }
                        : null
                }
            >
                <span style={{fontWeight:"bold"}}>Price :</span> : ₹{price}
            </Text>
           
            
            <Text><span style={{fontWeight:"bold"}}>Max Speed  :</span> {originalData.maxspeedofmodel} km/hr</Text>
            <Text
                style={
                    currentFilter === "milegeofmodel"
                        ? {
                            
                            
                            color: "green",
                            padding: "5px",
                            borderRadius: "5px",
                            margin: "5px",
                        }
                        : null
                }
            >
               <span style={{fontWeight:"bold"}}>Mielage :</span> {originalData.milegeofmodel} /ltr
            </Text>
            <Text> <span style={{fontWeight:"bold"}}>Power :</span> {originalData.powerofmodel} HP</Text>

          

            {decoded?.userID  === userID && userID ? (
                <Flex m={2} justifyContent={"space-around"}>
                    <Button
                        isLoading={loading}
                        onClick={() => handleDelete(_id)}
                        colorScheme="red"
                    >
                        Delete
                    </Button>



                    <Button onClick={() => setEditModalOpen(true)} colorScheme="green">
                        Edit
                    </Button>
                </Flex>
            ) : null}


            <EditForm
                id={_id}
                callData={() => calldata()}  ////This prop is a function that triggers the calldata() 
                editModalOpen={editModalOpen}
                setEditModalOpen={(e) => setEditModalOpen(e)}
            />
        </Box>
    )
}

export default OldCarsData