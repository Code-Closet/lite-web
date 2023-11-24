import { useCallback, useState } from "react";

const useTableRequestParam = (url) => {
  const [baseUrl] = useState(url);
  const [requestUrl, setRequestUrl] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const getRequestUrl = useCallback((page, size, sort, totalElements) => {
    const url = `${baseUrl}?page=${page}&size=${size}`;
    const sortParam = sort.map((el) => `&sort=${el}`);
    setPage(page);
    setSize(size);
    setCanPrevious(page > 0);
    setCanNext(totalElements > (page + 1) * size);
    setRequestUrl(`${url}${sortParam}`);
  }, []);

  const resetPage = useCallback((page, size, totalElements) => {
    setCanPrevious(page > 0);
    setCanNext(totalElements > (page + 1) * size);
  }, []);

  return {
    getRequestUrl,
    requestUrl: requestUrl
      ? requestUrl
      : `${baseUrl}?page=${page}&size=${size}&sort=id`,
    page,
    size,
    canPrevious,
    canNext,
    resetPage,
  };
};

export default useTableRequestParam;
