import React from "react";
import { resetFilter, setFilter } from "../redux/slices/task.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import StatusComponent from "./StatusComponent";

function Filter() {
  const dispatch = useDispatch<AppDispatch>();

  const filter = useSelector((state: RootState) => state.data.filter || []);

  const handleReset = () => {
    dispatch(resetFilter({}));
  };
  const handleFilterChange = (e: any) => {
    dispatch(setFilter({ ...filter, status: e.target.value }));
  };
  const handleSeacrh = (e: any) => {
    dispatch(setFilter({ ...filter, search: e.target.value }));
  }
  return (
    <div className="p-5 flex justify-between">
      <StatusComponent
        name="filter"
        value={filter?.status}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        placeholder="Search tasks"
        value={filter?.search}
        onChange={handleSeacrh}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        onClick={handleReset}
        className="hover:bg-blue-800 focus:ring-4 border focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Reset filters
      </button>
    </div>
  );
}

export default Filter;
