import { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./types";
import { mock_data } from "./mock-data";

const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mock_data, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });
  return (
    <table {...getTableProps}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key="header-row">
            {headerGroup.headers.map((headers) => (
              <th {...headers.getHeaderProps()} key={"header"}>
                {headers.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={"row"}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={"cell"}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
        <tr>
          <td></td>
        </tr>
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()} key={"footer-group"}>
            {footerGroup.headers.map((headers) => (
              <td {...headers.getFooterProps()} key={"footer"}>
                {headers.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
export default Table;
