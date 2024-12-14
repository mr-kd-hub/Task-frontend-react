import axios from "axios";
import { AppDispatch, RootState } from "../store";
import { setTasks } from "../slices/task.slice";
import { IFormFields } from "../../Interface";
// import { fetchData, getPost } from "../slices/task.slice";

export const setTasksAction = (): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const currentState = getState();
      const filter = currentState?.data?.filter;
      const response = await axios.post("http://localhost:3000/task/list", { ...filter, status: filter?.status === "All" ? undefined : filter?.status });
      dispatch(setTasks(response?.data?.task));
    } catch (err) {}
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
    } catch (err) {}
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
    } catch (err) {}
  };
};

export const updateTaskAction = (id:string,body: IFormFields): any => {
    return async (dispatch: AppDispatch, getState: any) => {
      try {
        if(!id) return
        const currentState = getState();
        const tasks = [...currentState.data.tasks];

        const response = await axios.patch(`http://localhost:3000/task/${id}`, {
          ...body,
        });
        if(response.status === 200){
            const index:number = currentState?.data?.tasks.findIndex((task:any) => task._id === id)            
            if(index !== -1){               
                    tasks[index] = {
                    ...currentState.data.tasks[index],
                    ...body
                }
                dispatch(setTasks(tasks));
            }
            return 
        }
      } catch (err) {}
    };
  };