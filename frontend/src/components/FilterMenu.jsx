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
    <div className="flex w-full justify-evenly">
      {filters.map((filter, index) => (
        <button
          className={"hover:text-[var(--primary)]"}
          key={index}
          onClick={() => setFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
