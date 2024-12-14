import { createSlice } from '@reduxjs/toolkit'
import { IFormFields } from '../../Interface';

export interface InitialState {
  tasks: any[]
  form: IFormFields,
  filter: {
    status: any,
    offset: number,
    limit: number
  }
}

const initialState: InitialState = {
  tasks: [],
  form: {
    title: '',
    description: '',
    status: ''
  },
  filter:{
    status: "All",
    offset: 0,
    limit: 10

  }
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
      }
    }

  },
});

// Action creators are generated for each case reducer function
export const { setTasks, setForm, setFilter, resetFilter } = taskSlice.actions

export default taskSlice.reducer