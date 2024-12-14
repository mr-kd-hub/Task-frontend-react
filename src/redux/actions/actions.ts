import axios from "axios";
import { AppDispatch, RootState } from "../store";
import { manageLoading, resetError, setError, setTasks } from "../slices/task.slice";
import { IFormFields } from "../../Interface";

export const setTasksAction = (): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const currentState = getState();
      const filter = currentState?.data?.filter;
      dispatch(manageLoading(true));
      const response = await axios.post("http://localhost:3000/task/list", {
        ...filter,
        status: filter?.status === "All" ? undefined : filter?.status,
      });
      dispatch(setTasks(response?.data?.task));
      dispatch(manageLoading(false));
    } catch (err: any) {
      dispatch(setErrorAction(err?.message || "Something went wrong"));
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const createTaskAction = (body: IFormFields): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const currentState = getState();
      const response = await axios.post(`http://localhost:3000/task`, {
        ...body,
      });
      if(response.data.task){
          return dispatch(setTasks([{ ...response.data.task }, ...currentState?.data?.tasks]));
      }
      dispatch(setTasks([{ ...body }, ...currentState?.data?.tasks]));
    } catch (err:any) {
        dispatch(setErrorAction(err?.message || "Something went wrong"))
        dispatch(manageLoading(false));
        return
    }
  };
};

export const deleteTaskAction = (id: string): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      if (!id) return;
      const currentState = getState();
      const response = await axios.delete(`http://localhost:3000/task/${id}`);
      console.log("currentState?.tasks", currentState?.data?.tasks, id);

      if (response.status === 200) {
        const newList = currentState?.data?.tasks.filter(
          (item: any) => item._id !== id
        );
        return dispatch(setTasks([...newList]));
      }
    } catch (err:any) {
        dispatch(setErrorAction(err?.message || "Something went wrong"))
        dispatch(manageLoading(false));
        return
    }
  };
};

export const updateTaskAction = (id: string, body: IFormFields): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      if (!id) return;
      const currentState = getState();
      const tasks = [...currentState.data.tasks];

      const response = await axios.patch(`http://localhost:3000/task/${id}`, {
        ...body,
      });
      if (response.status === 200) {
        const index: number = currentState?.data?.tasks.findIndex(
          (task: any) => task._id === id
        );
        if (index !== -1) {
          tasks[index] = {
            ...currentState.data.tasks[index],
            ...body,
          };
          dispatch(setTasks(tasks));
        }
        return;
      }
    } catch (err:any) {
        dispatch(setErrorAction(err?.message || "Something went wrong"))
        return
    }
  };
};

export const getTaskAction = (id: string): any => {
    return async (dispatch: AppDispatch, getState: any) => {
      try {
        if (!id) return;
        const response = await axios.get(`http://localhost:3000/task/${id}`);
        if (response.status === 200) {
          return response?.data?.task
        }
      } catch (err:any) {
        dispatch(setErrorAction(err?.message || "Something went wrong"))
        dispatch(manageLoading(false));
        return
      }
    };
  };

  export const setErrorAction = (err: string): any => {
    return (dispatch: AppDispatch, getState: any) => {
      dispatch(setError(err));
      setTimeout(() => dispatch(resetError()), 1500);
    };
  };