import { usePagination, useTable, useGlobalFilter } from "react-table";
import "./table.scss";
import GlobalFilter from "./GlobalFilter";

const PaginationTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;
  return (
    <div className="table-container">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-box">
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
            {page.map((row) => {
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

      <div className="pagination">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>

        <select
          className="page-count-select"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <i className="bx bx-first-page"></i>
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <i className="bx bx-chevron-left"></i>
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <i className="bx bx-chevron-right"></i>
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <i className="bx bx-last-page"></i>
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
