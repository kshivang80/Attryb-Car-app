import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    SimpleGrid,
    Input,
    Select,
    FormLabel,
    FormControl,
    useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const EditForm = ({
    editModalOpen,
    setEditModalOpen,
    id,
    callData,
}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const auth = useSelector((state) => state.auth);
    // console.log(auth.token, "message in edit")]
    const toast = useToast()




    const getData = () => {
        axios
            .get(`https://odd-lime-chicken-wrap.cyclic.app/old/${id}`)
            .then((response) => {
                setFormData(response.data.oldcars);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));;
    };



    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(id, "indise")
        console.log(formData)

        axios
            .patch(`https://odd-lime-chicken-wrap.cyclic.app/old/update/${id}`, formData, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": auth.token
                }
            })
            .then((response) => {
                toast({
                    title: 'Edit Successful',
                    position: 'top',
                    status: 'success',
                    isClosable: true,
                })

                setLoading(false);
                callData();
                setEditModalOpen(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <>
            <Modal
                blockScrollOnMount={false}
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
            >
                <ModalOverlay backdropFilter={"blur(10px)"} />
                <ModalContent>
                    <ModalHeader>Update Deal </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleUpdate}>
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
                            <Button
                                type='submit'
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Update Data
                            </Button>
                        </form>
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};