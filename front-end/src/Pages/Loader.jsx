import {
    Box,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack,
  } from "@chakra-ui/react";
  import React from "react";
  
  const Loader = ({ cardShow, searchShow }) => {
    
   
  
    return (
      <div>
        {searchShow ? (
          <>
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </>
        ) : null}
        {cardShow ? (
          <>
            <Box padding="6" textAlign={"center"} boxShadow="lg" bg="white">
              <SkeletonCircle textAlign={"center"} size="20" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            </Box>
          </>
        ) : null}
      </div>
    );
  };
  
  export default Loader;