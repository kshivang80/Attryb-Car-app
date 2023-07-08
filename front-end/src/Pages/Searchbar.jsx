import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    Input,
    Text,
    SimpleGrid,
    Box,
    useToast,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  

import Loader from "./Loader";
import SearchData from "./SearchData";




  export const Searchbar = ({
    nav,
    serachDrawerOpen,
    setSearchDrawerOpen,
    sendSelected,
  }) => {
    const [search, setSearch] = useState("");
    const [debouce, setDebouce] = useState(false);
    const [loading,setLoading]=useState(false)
    const [data, setData] = useState([]);
    const toast = useToast()

    const selectcarAlert = () => {
        toast({
            title: 'Selected Succcesful',
            position: 'top',
            status: 'success',
            isClosable: true,
          })
      };
  
    

    const getData=()=>{
          setLoading(true)
           axios.get(`https://odd-lime-chicken-wrap.cyclic.app/oems/allOems?search=${search}`)
           .then((res)=>{
            setData(res.data.carSpecs);
            setLoading(false)
           })
           .catch((err)=>{
             console.log(err)
             setLoading(false)
           })
    }
   console.log(data)

 


    useEffect(() => {
  
  
      if (debouce) {
        let id = setTimeout(() => {
          getData();
        }, 500);
  
        return () => clearTimeout(id);
      } else {
        setDebouce(true);
      }
    }, [search]);
  
    return (
      <>
        <Drawer
          isOpen={serachDrawerOpen}
          placement="bottom"
          onClose={() => setSearchDrawerOpen(false)}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody maxH={"500px"}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Models"
                type="search"
              />
              {data.length !== 0 ? (
                <Text
                  pos={"sticky"}
                  bg="green.400"
                  color="white"
                  boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                  m="auto"
                  mt={4}
                  width={"330px"}
                  borderRadius={10}
                  p={2}
                  textAlign={"center"}
                >
                  Select Your Cars for Listing
                </Text>
              ) : null}
  
              <SimpleGrid
                fonstSize="12px"
                fontWeight={300}
                mt={4}
                gap={3}
                columns={[1, 2, 3, 4]}
              >
                {data.length === 0||loading ? (
                  <>
                    <Loader searchShow={true} /> <Loader searchShow={true} />{" "}
                    <Loader searchShow={true} /> <Loader searchShow={true} />
                  </>
                ) : (
                  data.map((el) => (
                    <Box
                      onClick={() => [
                        sendSelected({
                          id: el._id,
                          nameofmodel: el.nameofmodel,
                          yearofmodel: el.yearofmodel,
                        }),
                        setSearchDrawerOpen(false),
                        !nav? selectcarAlert():null
                        
                      ]}
                      key={el._id}
                    >
                      <SearchData {...el} />
                    </Box>
                  ))
                )}
              </SimpleGrid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };