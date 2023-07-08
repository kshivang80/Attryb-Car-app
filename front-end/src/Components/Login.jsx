import "./Login.css"
import { useToast, Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue, Image, InputGroup, InputRightElement, FormHelperText, FormErrorMessage } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authlogin, getSingleUser } from "../Redux/Auth/Auth.action";
import { Link } from "react-router-dom";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast()


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //let message;

  // Showing error messaage when input filed is empty
  const isErrorEmail = formData.email === ""
  const isErrorPassword = formData.password === ""



  const auth = useSelector((state) => state.auth);
  console.log(auth, "message in login")



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.email !=="" && formData.password !=="" ){

        dispatch(authlogin(formData));
        dispatch(getSingleUser(auth.token))
        toast({
            title: 'Login Successful',
            position: 'top',
            status: 'success',
            isClosable: true,
          })

        
          navigate("/");
         
        
    }else if (auth.message === "Wrong Credentials") {
        toast({
          title: 'Invalid User',
          position: 'top',
          isClosable: true,
          status: "error"
  
        })
        setInvalidUser(true)
  
      } else {
        setInvalidUser(false);
      }
   
  };





  return (
    <div  >
      <div className='bgBlue'
        //style={{ backgroundImage: `url(${loginbg1})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
   

        <Box h="550px" >
          <Box className='form'>

            <form onSubmit={handleSubmit}>
              {/* <Box className='loginTExt' >
                <Text className='loginTExt1' >Login to get start</Text>
              </Box> */}
              <Box
                //border="1px solid red"

                boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px"
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius={"10px"}

                p={8}>
                <Box className='loginTExt' >
                  <Text className='loginTExt1' mt="-5px">Login to get start</Text>
                  <Text fontSize={'lg'} color={'gray.600'}>
                        Go to the <Link to="/signup"><Button variant={"link"}>Register Page</Button></Link> 
                    </Text>
                </Box>
                <Stack spacing={5}>
                  <FormControl id="email" isInvalid={isErrorEmail}>
                    <FormLabel color="gray">Email </FormLabel>
                    <Input type="email" size='lg' variant='outline'
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {!isErrorEmail ? (
                      <FormHelperText>
                        {/* Enter the email  */}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>Email is required.</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl id="password" isInvalid={isErrorPassword}>
                    <FormLabel color="gray">Password</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? 'text' : 'password'} size='lg' variant='outline'
                        id="password"
                        name="password"

                        value={formData.password}
                        onChange={handleChange}
                      />
                      <InputRightElement h={'full'}>
                        <Button

                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon style={{ width: "30px", height: "30px", color: "gray" }} /> : <ViewOffIcon style={{ width: "30px", height: "30px", color: "gray" }} />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    {!isErrorPassword ? (
                      <FormHelperText>
                        {/* Enter the email  */}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>Password is required.</FormErrorMessage>
                    )}
                  </FormControl>

                  <Stack spacing={7}>
                    {/* <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}>
                      <Box></Box>
                      <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack> */}
                    <Button
                      type="submit"
                      className='btnform'

                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}>
                      Login
                    </Button>


                  </Stack>
                  {invalidUser && (
                    <Box >
                      <Text textAlign={"center"} color="red" fontSize="sm">
                        Invalid email or password.
                      </Text>

                    </Box>

                  )}
                </Stack>
              </Box>

            </form>



          </Box>

          <Box h="80px">

          </Box>

        </Box>


      </div>

    </div>
  )
}

export default Login