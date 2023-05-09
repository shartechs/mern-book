import { useState, useEffect } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const FilterMenu = () => {
  const filters = ["All", "Want to Read", "Read", "Currently Reading"];
  const [filter, setFilter] = useState("All");
  const { dispatch } = useBooksContext();

  useEffect(() => {
    dispatch({ type: "FILTER_BOOKS", payload: filter });
  }, [filter, dispatch]);

  return (
    <div>
      {filters.map((filter, index) => (
        <button key={index} onClick={() => setFilter(filter)}>
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
