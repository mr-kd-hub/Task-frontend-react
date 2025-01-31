import { createSlice } from '@reduxjs/toolkit'
import { IFormFields } from '../../Interface';

export interface InitialState {
  tasks: any[];
  form: IFormFields;
  filter: {
    status: string | undefined;
    offset: number | undefined;
    limit: number | undefined;
    search: string | undefined;
    sort: string;
  };
  error: string;
  loading: boolean;
}

const initialState: InitialState = {
  tasks: [],
  form: {
    title: '',
    description: '',
    status: '',
    dueDate: ''
  },
  filter:{
    status: "All",
    offset: undefined,
    limit: undefined,
    search:"",
    sort:"createdAt"
  },
  error: "",
  loading: false
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state,action) => {
        state.tasks = action.payload
    },
    setForm: (state,action) => {
      state.form = action.payload
    },
    setFilter: (state,action) => {
      if(action.payload.status === "All"){
        state.filter.status = undefined
      }
      state.filter = action.payload
    },
    resetFilter: (state,action) => {
      state.filter = {
        ...state.filter,
        status: "All",
        sort:"createdAt",
        search:""
      }
    },
    setError: (state,action) => {
      state.error = action.payload
    },
    resetError: (state) => {
      state.error = ""
    },
    manageLoading: (state,action) => {
      state.loading = action.payload
    }

  },
});

// Action creators are generated for each case reducer function
export const { setTasks, setForm, setFilter, resetFilter, resetError, setError, manageLoading } = taskSlice.actions

export default taskSlice.reducer