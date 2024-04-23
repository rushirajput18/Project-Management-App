import { Box, Flex, Text, Badge, Stack, Divider } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";

export default function ProjectComp({ projectData, loading }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ maxHeight: "420px", overflowY: "auto" }}
      ref={cardRef}
      onWheel={(e) => {
        if (
          e.deltaY > 0 &&
          e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
            e.currentTarget.clientHeight
        ) {
          e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
        } else if (
          e.deltaY < 0 &&
          e.currentTarget.scrollTop === 0
        ) {
          e.currentTarget.scrollTop = 0;
        }
      }}
    >
      <Box bg="white" boxShadow="md" borderRadius="md" p={6} maxW="600px" mx="auto">
        <Flex justifyContent="space-between" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {projectData.title}
          </Text>
          <Badge colorScheme="blue">{projectData.status}</Badge>
        </Flex>
        <Stack spacing={4}>
          <Box>
            <Text fontWeight="bold">Start Date:</Text>
            <Text>{projectData.StartDate}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">End Date:</Text>
            <Text>{projectData.EndDate}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Description:</Text>
            <Text>{projectData.description}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Leader:</Text>
            <Text>{projectData.leader.name}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Employees:</Text>
            <Stack spacing={1}>
              {projectData.employees.map((employee) => (
                <Text key={employee._id}>{employee.name}</Text>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Divider my={4} />
        {/* Add any additional content or actions here */}
      </Box>
    </div>
  );
}