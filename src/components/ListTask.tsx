import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setForm } from "../redux/slices/task.slice";
import {
  deleteTaskAction,
  getTaskAction,
  setTasksAction,
} from "../redux/actions/actions";
import Filter from "./Filter";
import Preview from "./Preview";

function ListTask() {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState({
    detail: undefined,
  });
  const tasks = useSelector((state: RootState) => state.data.tasks || []);
  const filter = useSelector((state: RootState) => state.data.filter || {});
  const loading = useSelector((state: RootState) => state.data.loading);

  const handleAction = async (action: string, id: string) => {
    if (action === "delete") {
      dispatch(await deleteTaskAction(id));
    }
    if (action === "edit") {
      dispatch(setForm(tasks.find((task) => task._id === id)));
    }
    if (action === "view") {
      const data = await dispatch(getTaskAction(id));      
      setState({ detail: data });
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

  return (
    <>
      <div className="flex-col gap-5 border border-dashed border-gray-950 border-spacing-6">
        <Filter />
        <div className="w-full p-5">
          <table className="w-full h-full table-auto">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            {!loading ? <tbody>
              {tasks?.length
                ? tasks.map((task, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 p-4"
                      >
                        <td>{task?.title}</td>
                        <td>
                        {task?.description?.slice(0, 50) || "-"}
                        {task?.description?.length > 50 && '...'}
                        </td>
                        <td>{task?.status}</td>
                        <td>
                          <div
                            className="inline-flex rounded-md shadow-sm"
                            role="group"
                          >
                            <button
                              type="button"
                              onClick={() => handleAction("edit", task?._id)}
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAction("delete", task?._id)}
                              className="border-r rounded-e-lg px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              data-modal-target="default-modal"
                              data-modal-toggle="default-modal"
                              onClick={() => handleAction("view", task?._id)}
                              className="border-r rounded-e-lg px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : "No Task found"}
            </tbody> : <div className="w-full justify-center items-center flex-1 flex fixed">Loading...</div>}
          </table>
        </div>
      </div>
      <div>
        {state?.detail && (
          <Preview
            data={state?.detail}
            onClose={() => setState({ detail: undefined })}
          />
        )}
      </div>
    </>
  );
}

export default ListTask;
