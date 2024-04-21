import {format, parseISO} from "date-fns";
export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
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
    accessor: (row)=> format(parseISO(row.deadline), "dd MMM yyyy"),
  },
];
export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: (row)=> format(parseISO(row.deadline), "dd MMM yyyy"),
  },
  // {
  //   Header: "PROGRESS",
  //   accessor: "progress",
  // },
];
