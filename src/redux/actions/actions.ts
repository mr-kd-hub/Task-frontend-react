// import axios from "axios";
import axios from "../../axiosInstance";
import { AppDispatch } from "../store";
import { manageLoading, resetError, setError, setTasks } from "../slices/task.slice";
import { IFormFields, IUserFormFields } from "../../Interface";
import { login, setAuthState } from "../slices/auth.slice";
    // "@types/react-router-dom": "^5.3.3"

export const setTasksAction = (): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const currentState = getState();
      const filter = currentState?.data?.filter;
      dispatch(manageLoading(true));
      const response = await axios.post("/task/list", {
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
      const response = await axios.post(`/task`, {
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
      const response = await axios.delete(`/task/${id}`);
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

      const response = await axios.patch(`/task/${id}`, {
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
      const response = await axios.get(`/task/${id}`);
      if (response.status === 200) {
        return response?.data?.task;
      }
    } catch (err: any) {
      dispatch(setErrorAction(err?.message || "Something went wrong"));
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const setErrorAction = (err: string): any => {
  return (dispatch: AppDispatch, getState: any) => {
    dispatch(setError(err));
    setTimeout(() => dispatch(resetError()), 1500);
  };
};

export const loginAction = (body:IUserFormFields) => {
  return async(dispatch: AppDispatch, getState: any) => {
    try{
      const response = await axios.post(`/auth/sign-in`, {
        ...body,
      });
      if(response.status === 200){
        dispatch(login(response?.data?.token))
        return 200;
      }
      dispatch(setError("Something went wrong while login"));
      return 401;
    }
    catch(err:any){
      dispatch(setError(err?.message || "Something went wrong"));
      dispatch(manageLoading(false));
      return;
    }
  }
}

export const registerAction = (body:IUserFormFields) => {
  return async(dispatch: AppDispatch, getState: any) => {
    try{
      const response = await axios.post(`/auth/sign-up`, {
        ...body,
      });
      if(response.status === 200){
        dispatch(login(response?.data?.token))
        return 200;
      }
      dispatch(setError("Something went wrong while login"));
      return 401;
    }
    catch(err:any){
      dispatch(setError(err?.message || "Something went wrong"));
      dispatch(manageLoading(false));
      return;
    }
  }
}

export const setAuthStateAction = (token:any):any => {
  return async(dispatch: AppDispatch, getState: any) => {
    const tk = token || localStorage.getItem("token");
    dispatch(setAuthState(tk))
    return !!token
  }
}