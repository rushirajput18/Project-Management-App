import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Grid, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import AddNFTCard from "./AddNFTCard";

// New ProjectCard component
const ProjectCard = ({ project }) => {
  const { title, description, leader, employees } = project;
  return (
    <Box bg="gray.200" p={4} borderRadius="md">
      <Text fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text mb={2}>{description}</Text>
      <Text>Leader: {leader ? leader.name : "Unknown"}</Text>
      <Text>
        Employees: {employees.map((employee) => employee.name).join(", ")}
      </Text>
    </Box>
  );
};

export default function Marketplace() {
  const [projects, setProjects] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/project/allProjects");
        const projectData = response.data.data.projects;
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchUpdatedProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/project/allProjects");
        const updatedProjectData = response.data.data.projects;
        setProjects(updatedProjectData);
      } catch (error) {
        console.error("Error fetching updated projects:", error);
      }
    };
    fetchUpdatedProjects();
  }, [projects]);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex flexDirection="column" gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 4" }}>
          <Flex direction="column">
            <Text mt="25px" mb="36px" color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
              All Projects
            </Text>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px" mb={{ base: "20px", xl: "0px" }}>
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
              <AddNFTCard setProjects={setProjects} />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}