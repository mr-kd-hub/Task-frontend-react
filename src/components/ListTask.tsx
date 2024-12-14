import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import axios from "axios";
import { resetFilter, setFilter, setForm, setTasks } from "../redux/slices/task.slice";
import { deleteTaskAction, setTasksAction } from "../redux/actions/actions";

function ListTask() {
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector((state: RootState) => state.data.tasks || []);
  const filter = useSelector((state: RootState) => state.data.filter || []);

  const handleAction = async (action: string, id: string) => {
    if (action === "delete") {
      dispatch(await deleteTaskAction(id));
    }
    if (action === "edit") {
      dispatch(setForm(tasks.find((task) => task._id === id)));
    }
  };

  useEffect(() => {
    async function callPAI() {
      try {
        dispatch(await setTasksAction());
      } catch (error) {
        console.error("Error:", error);
      }
    }
    callPAI();
  }, [filter]);

  const handleReset = () => {
    dispatch(resetFilter({}));
  };
  const handleFilterChange = (e: any) => {
    dispatch(setFilter({ ...filter, status: e.target.value }));
  };
  return (
    <div className="flex-col gap-5 border border-dashed border-gray-950 border-spacing-6">
      <div className="p-5 flex justify-between">
        <select
          name="status"
          value={filter?.status}
          onChange={handleFilterChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //   onBlur={handleBlur}
        >
          <option value={"All"}>All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={handleReset}
          className="hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset filters
        </button>
      </div>
      <div className="w-full p-5">
        <table className="w-full table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks?.length
              ? tasks.map((task, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td>{task?.title}</td>
                      <td>{task?.description || "-"}</td>
                      <td>{task?.status}</td>
                      <td>
                        <button onClick={() => handleAction("edit", task?._id)}>
                          Edit
                        </button>{" "}
                        <button
                          onClick={() => handleAction("delete", task?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Task found"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTask;
