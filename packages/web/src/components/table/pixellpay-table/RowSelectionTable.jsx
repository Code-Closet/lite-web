import { useRowSelect, useTable, useGlobalFilter } from "react-table";
import Checkbox from "./Checkbox";
import "./table.scss";
import GlobalFilter from "./GlobalFilter";
import { useEffect } from "react";
const RowSelectionTable = ({
  columns,
  data,
  hideGlobalfilter = false,
  setSelectedRows,
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ toggleRowSelected, isAllRowsSelected, rows }) => {
              const modifiedOnChange = (event) => {
                rows.forEach((row) => {
                  row.original.validations &&
                    toggleRowSelected(row.id, event.currentTarget.checked);
                });
              };
              let selectableRowsInCurrentPage = 0;
              let selectedRowsInCurrentPage = 0;
              rows.forEach((row) => {
                row.isSelected && selectedRowsInCurrentPage++;
                row.original.validations && selectableRowsInCurrentPage++;
              });
              const disabled = selectableRowsInCurrentPage === 0;
              const checked =
                (isAllRowsSelected ||
                  selectableRowsInCurrentPage === selectedRowsInCurrentPage) &&
                !disabled;
              return (
                <Checkbox
                  onChange={modifiedOnChange}
                  checked={checked}
                  disabled={disabled}
                />
              );
            },
            Cell: ({ row }) => {
              return (
                <Checkbox
                  {...row.getToggleRowSelectedProps()}
                  disabled={!row.original.validations}
                />
              );
            },
          },
          ...columns,
        ];
      });
    },
    useGlobalFilter
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    setGlobalFilter,
    state: { globalFilter },
  } = tableInstance;

  useEffect(() => {
    setSelectedRows(selectedFlatRows);
  }, [selectedFlatRows]);
  return (
    <div className="table-container">
      {!hideGlobalfilter && (
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      )}
      <div className="table-box table-no-pagination">
        <table {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={"header-group"}>
                {headerGroup.headers.map((headers) => (
                  <th {...headers.getHeaderProps()} key={headers.Header}>
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
                <tr {...row.getRowProps()} key={row.data}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.data}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RowSelectionTable;
