import { useEffect, useState } from "react";
import { generateUsers } from "../../api/admin/admin";

export const makeData = (whichTable) => {
  let data = [];
  switch (whichTable) {
    case "users":
      data = generateUsers(1000);
      break;
    default:
      data = [];
      break;
  }
  return data;
};

export const makeColumns = (whichTable) => {
  let columns = [];
  switch (whichTable) {
    case "users":
      columns = adminColumns;
      break;
    default:
      break;
  }
  return columns;
};

const useMakeTable = (table) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setColumns(makeColumns(table));
    setData(makeData(table));
  }, [table]);

  return { columns, data };
};

export default useMakeTable;

const adminColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Status",
    accessor: "status",
    disableFilters: true,
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    Cell: () => {
      return (
        <>
          <span style={{ color: "red" }}>Modify</span>
          <button style={{ marginLeft: "10px" }}>Edit</button>
        </>
      );
    },
  },
];
