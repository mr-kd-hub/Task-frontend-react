import React from "react";

function StatusComponent(props: any) {
  const { value, name, onBlur, onChange } = props;
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onBlur={onBlur}
    >
      {!onBlur && <option value={"All"}>All</option>}
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
}

export default StatusComponent;
