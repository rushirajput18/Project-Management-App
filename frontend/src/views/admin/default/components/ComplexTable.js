import React, { useMemo, useState } from "react";
import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import { isValid, parseISO } from "date-fns";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;
  const [pageIndex, setPageIndex] = useState(0); // Track current page index

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [task,setTasks]=useState(tableData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTask = () => {
    if (newTaskName && newTaskDeadline) {
      const isoDateString = newTaskDeadline;
      const isoDate = new Date(isoDateString);

      // Formatting the date
      const options = {
        year: "numeric",
        month: "long", // or 'short', 'numeric', etc. based on your preference
        day: "numeric",
      };

      // Convert the ISO date to a formatted string
      const formattedDate = isoDate.toLocaleDateString("en-US", options);

      if (isValid(formattedDate)) {
        const newTask = {
          name: newTaskName,
          // status: newTaskStatus,
          deadline: formattedDate, // Use toISOString() on the parsed Date object
          progress: "0",
          employee: newEmployees,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskName("");
        setNewTaskDeadline("");
        // setNewTaskStatus("In Progress");
        setNewEmployees("");
        onClose();
      } else {
        alert(
          "Invalid date format. Please enter the date in the correct format."
        );
      }
    } else {
      alert("Please enter valid task details.");
    }
  };
 
  const [newTaskName, setNewTaskName] = useState("");
  const [newEmployees, setNewEmployees] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  // const [newTaskStatus, setNewTaskStatus] = useState("In Progress");

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex, pageSize: 10 }, // Set initial page index and size
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageCount,
    gotoPage,
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Project Table
        </Text>
        <Menu />
        {/* <Button colorScheme="brand" onClick={onOpen}>
          Add Task
        </Button> */}
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index} py="8px">
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.row.original.title}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE") {
                    // Assuming cell.row.original.StartDate holds the ISO 8601 formatted date string
                    const isoDateString = cell.row.original.StartDate;
                    const isoDate = new Date(isoDateString);

                    // Formatting the date
                    const options = {
                      year: "numeric",
                      month: "long", // or 'short', 'numeric', etc. based on your preference
                      day: "numeric",
                    };

                    // Convert the ISO date to a formatted string
                    const formattedDate = isoDate.toLocaleDateString(
                      "en-US",
                      options
                    );

                    // Render the formatted date
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {formattedDate}
                      </Text>
                    );
                  } else if (cell.column.Header === "PROGRESS") {
                    data = (
                      <Flex align="center">
                        <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="108px"
                          value={cell.row.original.donePercentage}
                        />
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Task Name</FormLabel>
              <Input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Deadline</FormLabel>
              <Input
                type="date"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
              />
            </FormControl>
            {/* <FormControl mb={4}>
              <FormLabel>Status</FormLabel>
              <Input
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
              />
            </FormControl> */}

            <FormControl mb={4}>
              <FormLabel>Employee ID</FormLabel>

              <Input
                value={newEmployees}
                onChange={(e) => setNewEmployees(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
              Add Task
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Pagination controls */}
      <Flex justify="center" mt="20px">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"First__"}
        </button>{" "}
        <button onClick={previousPage} disabled={!canPreviousPage}>
          {"Previous__"}
        </button>{" "}
        {Array.from({ length: pageCount }, (_, i) => (
          <button key={i} onClick={() => gotoPage(i)}>
            {i + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={!canNextPage}>
          {"__Next__"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {"Last"}
        </button>{" "}
      </Flex>
    </Card>
  );
}
