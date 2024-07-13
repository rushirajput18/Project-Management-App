// Chakra imports
import { useState, useEffect } from "react";
import Axios from "axios";
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import axios from "axios";

import Card from "components/card/Card.js";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TableTopCreators from "views/admin/default/components/TableTopCreators";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
// import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
// import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
// import tableDataTopCreators from "views/admin/default/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/default/variables/tableColumnsTopCreators";

export default function UserReports() {
  // Chakra Color Mode
  const [topEmployees, setTopEmployees] = useState([]);
  const totalProj = 0;
  useEffect(() => {
    fetchData();
    //fetchDataProjects();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5000/employee/getTopEmployees"
      );

      setTopEmployees(response.data);
    } catch (error) {
      console.error("Error fetching top employees:", error);
    }
  };
  const YourComponent = () => {
    const [taskCount, setTaskCount] = useState(null);
    //const [projectCount, setProjectCount] = useState(null);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/task/countTask"
        );
        setTaskCount(response.data.taskCount); // Assuming your API returns the task count in the format { taskCount: 6 }
      } catch (error) {
        console.error("Error fetching task count:", error);
      }
    };

    return (
      // Your JSX code that uses taskCount
      <MiniStatistics
    
        startContent={
          <IconBox
            w="56px"
            h="56px"
            bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
            icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
          />
        }
        name="Total Tasks"
        value={taskCount !== null ? taskCount.toString() : "Loading..."}
      />
    );
  };
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [totalProjects, setTotalProjects] = useState(0);
  const [projectCount, setProjectCount] = useState(null);
  const [projectData, setProjectData] = useState([
    {
      name: "Weekly Updates",
      status: "Approved",
      date: "12 Jul 2021",
      progress: 50.5,
    },
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/project/allProjects",
          {
            params: {
              status: "Assigned", // Change this to your desired status
            },
          }
        );

        const projectsArray = response.data.data.projects.length.toString();

        if (projectsArray) {
          setTotalProjects(projectsArray);
          // console.log("Total projects:", projectsArray);
        } else {
          console.log("Projects array is undefined");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchDataProjects = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/project/countProjects"
        );
        console.log("Number of projects: ", response.data.projectCount);
        setProjectCount(response.data.projectCount);
      } catch (error) {
        console.error("Error fetching task count:", error);
      }
    };

    const Projects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/project/allProjects"
        );

        const projectsArray = response.data.data.projects;
        console.log("Total projects:", projectsArray);

        // Fetch progress data from the backend
        const progressResponse = await axios.get(
          "http://localhost:5000/project/pieChart"
        );
        const progressData = progressResponse.data;

        const projectsWithProgress = projectsArray.map((project) => {
          // Find progress data corresponding to the project ID
          const progress = progressData.find(
            (progressItem) => progressItem._id === project._id
          );

          if (progress) {
            console.log("Matched ID:", project._id);
          }

          // If progress data is found, assign donePercentage to the project
          if (progress) {
            project.donePercentage = progress.donePercentage;
          } else {
            // If progress data is not found for the project, set donePercentage to 0 or any default value
            console.log("ashok");
            project.donePercentage = 0;
          }

          return project;
        });

        if (projectsWithProgress) {
          setProjectData(projectsWithProgress);
        } else {
          console.log("Projects array is undefined");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    Projects();
    fetchProjects();
    fetchDataProjects();
  }, []);

  return (
    <Box pt={["130px", "80px", "80px", "80px"]}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
       
        <YourComponent />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Projects"
          value={projectCount}
        />
      </SimpleGrid>

      
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={projectData}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
          {/* <Tasks /> */}
          <Card px="0px" mb="2px">
            <TableTopCreators
              tableData={topEmployees}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          {/* <MiniCalendar h='100%' minW='100%' selectRange={false} /> */}
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
