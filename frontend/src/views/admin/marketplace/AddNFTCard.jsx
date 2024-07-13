import React, { useState } from "react";
import axios from "axios";
import mongoose from 'mongoose'; // or const mongoose = require('mongoose');

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import Card from "components/card/Card.js";

const AddNFTCard = ({ setNFTCards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // State variables for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [leader, setLeader] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddProject = async () => {
    try {
      const employeeIds = employees.map((empId) => new mongoose.Types.ObjectId(empId));
      const leaderId = new mongoose.Types.ObjectId(leader);
  
      const projectData = {
        title,
        description,
        employees: employeeIds,
        endDate,
        leader: leaderId,
      };
  
      const response = await axios.post("http://localhost:5000/project/createProject", projectData);
      console.log('Project created:', response.data);
      // Reset form fields or perform any other necessary actions
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setEmployees([]);
      setLeader('');
      setEndDate('');
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error
    }
  };
  return (
    <>
      <Card p="20px">
        <Flex direction="column" justify="center" align="center" h="100%">
          <Icon onClick={handleOpenModal} as={IoAddCircleOutline} color={textColor} boxSize="50px" mb="20px" />
          {/* <Text color={textColor} fontSize="lg" fontWeight="bold" mb="10px">
            Add New Project
          </Text> */}
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
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Project name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Leader</FormLabel>
              <Input
                placeholder="Leader"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Employees</FormLabel>
              <Input
                placeholder="Employees"
                value={employees.join(", ")}
                onChange={(e) => setEmployees(e.target.value.split(",").map((emp) => emp.trim()))}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>EndDate</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleAddProject}>
              Add Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNFTCard;