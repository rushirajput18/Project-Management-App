import React, { useState, useEffect } from "react";
import axios from "axios";
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
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
  Select,
  CheckboxGroup,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import Card from "components/card/Card.js";

const AddNFTCard = ({ setNFTCards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [leader, setLeader] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      fetchEmployees();
    }
  }, [isModalOpen]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Reset the form fields
    setTitle("");
    setDescription("");
    setSelectedEmployees([]);
    setLeader("");
    setEndDate("");
    setIsModalOpen(false);
  };

  const handleAddProject = async () => {
    try {
      const projectData = {
        title,
        description,
        employees: selectedEmployees,
        endDate,
        leader,
      };

      const response = await axios.post("http://localhost:5000/project/createProject", projectData);
      console.log("Project created:", response.data);
      
      const newProject = response.data.data.project;

      const newNFTCard = {
        _id: newProject._id,
        name: newProject.title,
        description: newProject.description,
        author: newProject.leader ? newProject.leader.name : "Unknown",
        bidders: newProject.employees.map((employee) => employee.name),
      };

      setNFTCards((prevProjects) => [...prevProjects, newNFTCard]);

      handleCloseModal();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <Card p="20px">
        <Flex direction="column" justify="center" align="center" h="100%">
          <Icon
            onClick={handleOpenModal}
            as={IoAddCircleOutline}
            color={textColor}
            boxSize="50px"
            mb="20px"
          />
          <Button variant="darkBrand" color="white" onClick={handleOpenModal}>
            New Project
          </Button>
        </Flex>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Project name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Leader</FormLabel>
              <Select
                placeholder="Select leader"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              >
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Employees</FormLabel>
              <CheckboxGroup
                value={selectedEmployees}
                onChange={setSelectedEmployees}
              >
                <Stack>
                  {employees.map((employee) => (
                    <Checkbox key={employee._id} value={employee._id}>
                      {employee.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
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
