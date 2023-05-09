import { useBooksContext } from "../hooks/useBooksContext";

const FilterMenu = () => {
  const filters = ["All", "Want to Read", "Read", "Currently Reading"];
  const { dispatch } = useBooksContext();
  return (
    <div>
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => dispatch({ type: "FILTER_BOOKS", payload: filter })}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
