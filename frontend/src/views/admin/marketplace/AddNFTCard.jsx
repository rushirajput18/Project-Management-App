import React, {useState}from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
Button, Flex, Icon, Text, useColorModeValue,
  Input,
  FormControl,
  FormLabel,

  // Import any other necessary components
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import Card from "components/card/Card.js";
// import NFT from "components/card/NFT";

// Import any necessary assets or data for the new NFT card
// import Nft4 from "assets/img/nfts/Nft4.png";
// import Nft5 from "assets/img/nfts/Nft5.png";
// import Nft6 from "assets/img/nfts/Nft6.png";
// import Avatar1 from "assets/img/avatars/avatar1.png";
// import Avatar2 from "assets/img/avatars/avatar2.png";
// import Avatar3 from "assets/img/avatars/avatar3.png";
// import Avatar4 from "assets/img/avatars/avatar4.png";

const AddNFTCard = ({ setNFTCards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  // const handleAddNFT = () => {
  //   const newNFTCard = {
  //     name: "Random NFT Name",
  //     author: "By Random Author",
  //     bidders: [Avatar1, Avatar2],
  //     image: Nft4,
  //     currentbid: "0.91 ETH",
  //     download: "#",
  //   };
  
  //   setNFTCards((prevCards) => [...prevCards, newNFTCard]);
  // };

  return (
    <>
      <Card p="20px">
        <Flex direction="column" justify="center" align="center" h="100%">
          <Icon as={IoAddCircleOutline} color={textColor} boxSize="50px" mb="20px" />
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="10px">
            Add New Project
          </Text>
          <Button variant="darkBrand" color="white" onClick={handleOpenModal}>
            New Project
          </Button>
        </Flex>
      </Card>
  
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Add New Project</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <ModalBody>
        <FormControl mt={4}>
          <FormLabel>Project Image</FormLabel>
          <Input type="file" accept="image/*" />
        </FormControl>
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <Input placeholder="Project name" />
        </FormControl>
        <FormControl>
          <FormLabel>Creator</FormLabel>
          <Input placeholder="Creator" />
        </FormControl>
        <FormControl>
          <FormLabel>Collaborators</FormLabel>
          <Input placeholder="Collaborators" />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input placeholder="Description" />
        </FormControl>
        {/* Add more form fields as needed */}
      </ModalBody>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
        Close
      </Button>
      <Button variant="ghost">Add Project</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
};

export default AddNFTCard;