import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import React from "react";

export default function ProjectComp({ projectData, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Flex justifyContent="space-between" mb="20px">
        <Text fontSize="2xl" fontWeight="bold">
          {projectData.title}
        </Text>
        <Badge colorScheme="blue">{projectData.status}</Badge>
      </Flex>
      <Box mb="20px">
        <Text fontWeight="bold">Start Date:</Text>
        <Text>{projectData.StartDate}</Text>
      </Box>
      <Box mb="20px">
        <Text fontWeight="bold">End Date:</Text>
        <Text>{projectData.EndDate}</Text>
      </Box>
      <Box mb="20px">
        <Text fontWeight="bold">Description:</Text>
        <Text>{projectData.description}</Text>
      </Box>
      <Box mb="20px">
        <Text fontWeight="bold">Leader:</Text>
        <Text>{projectData.leader.name}</Text>
      </Box>
      <Box mb="20px">
        <Text fontWeight="bold">Employees:</Text>
        <ul>
          {projectData.employees.map((employee) => (
            <li key={employee._id}>{employee.name}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
