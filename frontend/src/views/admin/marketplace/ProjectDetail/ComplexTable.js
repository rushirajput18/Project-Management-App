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
  Input,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const [tasks, setTasks] = useState(tableData);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  //const [newTaskProgress, setNewTaskProgress] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTask = () => {
    if (newTaskName && newTaskDeadline ) {
      const newTask = {
        name: newTaskName,
        status: "Pending", // Set status to "Pending" by default
        deadline: newTaskDeadline,
        //progress: newTaskProgress,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskName("");
      setNewTaskDeadline("");
      //setNewTaskProgress(0);
      onClose(); // Close the modal after adding the task
    } else {
      alert("Please enter valid task details.");
    }
  };

  const data = useMemo(() => tasks, [tasks]);

  const tableInstance = useTable(
    {
      columns,
      data,
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
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

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
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Complex Table
        </Text>
        <Menu />
        <Button colorScheme="brand" onClick={onOpen}>
          Add Task
        </Button>
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
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
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex align='center'>
                        <Icon
                          w='24px'
                          h='24px'
                          me='5px'
                          color={
                            cell.value === "Approved"
                              ? "green.500"
                              : cell.value === "Disable"
                              ? "red.500"
                              : cell.value === "Error"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Approved"
                              ? MdCheckCircle
                              : cell.value === "Disable"
                              ? MdCancel
                              : cell.value === "Error"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  // } else if (cell.column.Header === "PROGRESS") {
                  //   data = (
                  //     <Flex align='center'>
                  //       <Progress
                  //         variant='table'
                  //         colorScheme='brandScheme'
                  //         h='8px'
                  //         w='108px'
                  //         value={cell.value}
                  //       />
                  //     </Flex>
                  //   );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH='30px !important'
                      py='8px'
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
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
            <Input
              placeholder="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Deadline"
              value={newTaskDeadline}
              onChange={(e) => setNewTaskDeadline(e.target.value)}
              mb={4}
            />
            {/* <Input
              placeholder="Progress"
              type="number"
              value={newTaskProgress}
              onChange={(e) => setNewTaskProgress(parseInt(e.target.value))}
              min={0}
              max={100}
            /> */}
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
    </Card>
  );
}
