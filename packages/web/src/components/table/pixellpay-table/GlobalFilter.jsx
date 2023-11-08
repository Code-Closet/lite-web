import { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onchange = useAsyncDebounce(
    (value) => {
      setFilter(value || undefined);
    },
    400,
    [filter]
  );
  const onChangeHandler = (e) => {
    setValue(e.target.value);
    onchange(e.target.value);
  };
  return (
    <span className="global-search">
      <i className="bx bx-search"></i>
      <input
        value={value || ""}
        onChange={onChangeHandler}
        placeholder="Type to Search ..."
      ></input>
    </span>
  );
};

export default GlobalFilter;
