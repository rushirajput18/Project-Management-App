import {format, parseISO} from "date-fns";
export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "title",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];
export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "title",
  },
  {
    Header: "STATUS",
    accessor: "email",
  },
  {
    Header: "DATE",
    accessor: "dueDate",
  },
  // {
  //   Header: "PROGRESS",
  //   accessor: "progress",
  // },
];
