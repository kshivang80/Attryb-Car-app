import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { authSignup } from '../Redux/Auth/Auth.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast()

    const auth = useSelector((state) => state.auth);
    console.log(auth, "message in signup")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profilePic: "",
    });


    useEffect(()=>{
        if(auth.message==="You are registered"){
            toast({
                title: 'Register Successful',
                position: 'top',
                status: 'success',
                isClosable: true,
              })
              navigate("/login");

        }else if(auth.message==="User already exists"){
            toast({
                title: 'User already exists',
                position: 'top',
                status: 'error',
                isClosable: true,
              })

        }else if(auth.message==="Error while registering"){
            toast({
                title: 'Something went Wrong',
                position: 'top',
                status: 'error',
                isClosable: true,
              })

        }

    },[auth.message])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.email !== "" && formData.password !== "" && formData.name !== "" ) {
            dispatch(authSignup(formData));
            //console.log("done")
           // setFormData("")
   
        }

    };



    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sigup in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        if you have already account click  <Link to="/login"><Button variant={"link"}>Login</Button></Link> 
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    id="password"
                                    name="password"

                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="profilePic">
                                <FormLabel>Profile-Pic</FormLabel>
                                <Input
                                    id="profilePic"
                                    name="profilePic"
                                    value={formData.profilePic}
                                    onChange={handleChange}
                                    placeholder='Enter the URL link' />
                            </FormControl>

                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                  type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}