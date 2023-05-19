import { useBooksContext } from "../hooks/useBooksContext";

const FilterMenu = () => {
  const labels = ["All", "Want to Read", "Read", "Currently Reading"];
  const { filter, dispatch } = useBooksContext();
  console.log(filter);

  return (
    <div className="flex w-full justify-evenly pb-[20px]">
      {labels.map((label, index) => (
        <button
          className={
            filter === label
              ? "text-[var(--primary)] hover:text-[var(--primary)]"
              : "hover:text-[var(--primary)]"
          }
          key={index}
          onClick={() => dispatch({ type: "FILTER_BOOKS", payload: label })}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
