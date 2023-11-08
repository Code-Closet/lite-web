export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    Footer: "Role",
    accessor: "role",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
  {
    Header: "Username",
    Footer: "Username",
    accessor: "username",
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
  },
  {
    Header: "DOB",
    Footer: "DOB",
    accessor: "dob",
    Cell: ({ value }) => {
      return new Date(value).toLocaleDateString() || "";
    },
  },
];
