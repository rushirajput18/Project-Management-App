// Chakra imports
import {
  // Avatar,
  Box,
  Flex,
  FormLabel,
  // Icon,
  // Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import Card from "components/card/Card.js";
import { useParams } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import ComplexTable from "./ComplexTable";
import TableTopCreators from "./TableTopCreators";
import {
  // columnsDataCheck,
  columnsDataComplex,
} from "./columnsData";
import {
  // columnsDataCheck,
  columnsDataComplex2,
} from "./columnsData2";

import { useDisclosure, Text, Button } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import { useState,useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import PieCard from "./PieCard";
import ProjectComp from "./ProjectComp";
// import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import tableDataTopCreators from "views/admin/default/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/default/variables/tableColumnsTopCreators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function ProjectDetails(props) {
  // Chakra Color Mode
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectTask, setProjectTask] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log("as", id);
  const { ...rest } = props;
  // states and functions
  const textColor = useColorModeValue("navy.700", "white");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  // const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const [deadline, setDeadline] = useState(null);

  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const handleNewProjectModalOpen = () => setIsNewProjectModalOpen(true);
  const handleNewProjectModalClose = () => {
    setDeadline(null); // Reset the deadline state to null
    setIsNewProjectModalOpen(false); // Close the modal window
  };
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        // Make an HTTP request to fetch project data based on the project ID
        const response = await axios.get(
          `http://localhost:5000/project/getProject/${id}`
        );
        setProjectData(response.data.data.project);
        const response2 = await axios.get(
          `http://localhost:5000/project/getTasks/${id}`
        );
        setProjectTask(response2.data.data.tasks);
        //  console.log(response.data.data.project); // Assuming response.data contains project details
        console.log("tasks",response2.data.data.tasks); // Assuming response.data contains project details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  document.documentElement.dir = "ltr";
  // const brandColor = useColorModeValue("brand.500", "white");
  // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box display="flex" flexDirection="row">
      <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
        <Sidebar routes={routes} display="none" {...props} />
        <Box flex="1">
          <Box>
            <Navbar
              onOpen={onOpen}
              logoText={"Horizon UI Dashboard PRO"}
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              message={getActiveNavbarText(routes)}
              fixed={fixed}
              {...props}
            />
          </Box>
          <Box
            mx="auto"
            p={{ base: "20px", md: "30px" }}
            pe="20px"
            minH="100vh"
            pt="130px"
          ></Box>
          <Box></Box>
        </Box>
      </SidebarContext.Provider>

      <Box pt={{ base: "130px", md: "80px", xl: "140px" }} ml="-50px">
        <Flex justify="space-between" mx="-20px" mb="20px" gap="20px">
          <SimpleGrid
            columns={{ base: 1, md: 1, xl: 1 }}
            gap="20px"
            width="74vh"
            height="420px"
          >
            <ComplexTable
              columnsData={columnsDataComplex2}
              tableData={projectTask}
              // tableData={tableDataComplex}
            />
            <Box px="0px" mb="2px">
              {loading ? (
                <p>Loading top creators data...</p>
              ) : (
                <TableTopCreators
                projectData={projectData}
                  columnsData={columnsDataComplex}
                />
              )}
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="10px">
           
            <ProjectComp projectData={projectData} loading={loading} />
            <PieCard/>
            
          </SimpleGrid>

        </Flex>
 
        {/* </Box> */}
        <Footer />
      </Box>
    </Box>
  );
}