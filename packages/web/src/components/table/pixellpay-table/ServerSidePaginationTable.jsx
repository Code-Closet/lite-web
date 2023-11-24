import { useEffect } from "react";
import {
  usePagination,
  useTable,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import "./table.scss";
import GlobalFilter from "./GlobalFilter";
import NoRecordsInfo from "./NoReordsInfo";

const ServerSidePaginationTable = ({
  columns,
  data,
  fetchData,
  currentPage,
  loading,
  canPrevious,
  canNext,
  totalCount,
  totalPage,
  sortBy,
  hideGlobalfilter = false,
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy: sortBy,
      },
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
    state,
    setPageSize,
    prepareRow,
    setGlobalFilter,
  } = tableInstance;

  const { pageSize, globalFilter } = state;

  useEffect(() => {
    console.log(`Total count of el : ${totalCount}`);
    fetchData(currentPage, pageSize, ["id"], totalCount);
  }, [pageSize]);

  const handleNextPage = () => {
    currentPage = currentPage + 1;
    fetchData(currentPage, pageSize, ["id"], totalCount);
  };

  const handlePrevPage = () => {
    currentPage = currentPage - 1;
    fetchData(currentPage, pageSize, ["id"], totalCount);
  };
  return (
    <div className="table-container">
      {!!data && data.length !== 0 ? (
        <>
          {!hideGlobalfilter && (
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          )}
          <div className="table-box">
            <table {...getTableProps}>
              {loading && (
                <div
                  style={{
                    width: "100%",
                    height: "90vh",
                    backgroundColor: "blue",
                  }}
                >
                  Loading...
                </div>
              )}
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={"header-group"}
                  >
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
                {currentPage + 1} of {totalPage}
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
            <button
              onClick={() => fetchData(0, pageSize, ["id"], totalCount)}
              disabled={!canPrevious}
            >
              <i className="bx bx-first-page"></i>
            </button>
            <button onClick={handlePrevPage} disabled={!canPrevious}>
              <i className="bx bx-chevron-left"></i>
            </button>
            <button onClick={handleNextPage} disabled={!canNext}>
              <i className="bx bx-chevron-right"></i>
            </button>
            <button
              onClick={() =>
                fetchData(totalPage - 1, pageSize, ["id"], totalCount)
              }
              disabled={!canNext}
            >
              <i className="bx bx-last-page"></i>
            </button>
          </div>
        </>
      ) : (
        <NoRecordsInfo />
      )}
    </div>
  );
};

export default ServerSidePaginationTable;
