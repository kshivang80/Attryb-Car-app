import { Box, Button, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";


const SearchData = ({
  imageofmodel,
  nameofmodel,
  powerofmodel,
  yearofmodel,
  newmodelprice,
  maxspeedofmodel,
  milegeofmodel,
  colorofmodel,
}) => {

 
  
  return (
    <Box
  
    _hover={{boxShadow:`rgba(0, 0, 0, 0.35) 0px 5px 15px;`}}
      cursor={"pointer"}
      m="auto"
      textAlign={"center"}
      borderRadius={4}
      p={4}
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
    >
       
      <center>
        <Image
          textAlign={"center"}
          height={200}
          borderRadius={5}
          src={imageofmodel}
          width={"100%"}
        />
      </center>
      <Text ><span style={{fontWeight:"bold"}}>Name :</span>   {nameofmodel}</Text>
      <Text ><span style={{fontWeight:"bold"}}>Year :</span> {yearofmodel}</Text>
      <Text > <span style={{fontWeight:"bold"}}>New Price  :</span> ₹ {newmodelprice}</Text>
      <Text><span style={{fontWeight:"bold"}}>Max Speed :</span> {maxspeedofmodel} km/hr</Text>
      <Text> <span style={{fontWeight:"bold"}}>Mielage :</span> {milegeofmodel} /ltr</Text>
      <Text> <span style={{fontWeight:"bold"}}>powerofmodel :</span> {powerofmodel} HP</Text>

      <SimpleGrid gap={2} columns={[2, 4]}>
        {colorofmodel.map((el) => (
          <Button
            pr={2}
            pl={2}
          
            fontSize="18px"
            textAlign={"center"}
            borderRadius={4}
           
          >
            {el}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchData;