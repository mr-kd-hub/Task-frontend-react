import { useEffect } from "react";
import { IFormFields } from "../Interface";
import {  useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { createTaskAction, updateTaskAction } from "../redux/actions/actions";
import StatusComponent from "./StatusComponent";

function TaskForm(props: any) {
  const dispatch = useDispatch<AppDispatch>()
  const form:any = useSelector((state: RootState) => state.data.form || {});
  
  const formik = useFormik<IFormFields>({
    initialValues: {
      title: form?.title || "",
      description: form?.description || "",
      status: form?.status || "To Do",
      dueDate: form?.dueDate || ""
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string(),
      status: yup.string(),
    }),
    onSubmit: async(values: IFormFields, { resetForm }) => {
      if(form?._id){
        dispatch(updateTaskAction(form?._id,values));
      resetForm();
        return;
      }
      dispatch(createTaskAction(values));
      resetForm();
    },
  });
  const { values, touched, errors, handleChange, handleSubmit, handleBlur, resetForm, setValues } = formik;
  const { title, status, description, dueDate } = values;

  const handleDateChange = (e: any) => {
    const dateObject = new Date(e.target.value);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();
    const formattedDate = `${year}-${month}-${day}`; //"2013-01-08"

    setValues({ ...values, dueDate: formattedDate });
  };
 useEffect(() => {
   if (form?._id) {
     setValues({
       ...values,
       title: form?.title,
       description: form?.description,
       status: form?.status,
       dueDate: form?.dueDate,
     });
     return;
   }
   resetForm();
 }, [form]);
 
 console.log("form",form?.dueDate, dueDate);
 
  return (
    <div className="p-3 border flex flex-col gap-4 border-dashed border-gray-950 border-spacing-6">
      <h1>{form?._id && values?.title ? "Update task" : "New task"}</h1>
      <form
        onReset={() => resetForm()}
        onSubmit={handleSubmit}
        className="w-full flex gap-6  items-center justify-center"
        // className="gap-6 p-3 justify-center w-full flex items-center border border-dashed border-gray-950 border-spacing-6"
      >
        <div className="">
          <input
            type="text"
            placeholder="Title"
            name="title"
            // error={!!touched.title && !!errors.title}
            value={title}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onBlur={handleBlur}
          />
          <div className="text-red-700">
            {!!touched.title && !!errors.title && "This fied is required."}
          </div>
        </div>

        <div className="">
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onBlur={handleBlur}
          />
        </div>
        <div className="">
          <StatusComponent
            name="status"
            value={status}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <input
            placeholder="yyyy-mm-dd"
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            onBlur={handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {form?._id && values?.title ? "Update Task" : "Add Task"}
          </button>
          <button
            type="reset"
            className="hover:bg-blue-800 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
