// import logo from './logo.svg';
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import { setAuthStateAction } from "./redux/actions/actions";
import Register from "./components/Register";

function App(props: any) {
  const dispatch = useDispatch();
  
  // const isAuthenticated = useSelector(
  //   (state: any) => state.auth.isAuthenticated
  // );

  // useEffect(() => {
  //   dispatch(setAuthStateAction());
  // }, [dispatch]);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  useEffect(() => {
    // Check token from localStorage and set authentication state
    const token = localStorage.getItem("token");
    dispatch(setAuthStateAction(token));
  }, [dispatch]);

  console.log("isAuthenticated",isAuthenticated);
  
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<PrivateRoute element={<Dashboard />} />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
/* <div className="App p-10 justify-center">
        <div className="w-full">
          <CreateTaskForm />
        </div>
        <div className="w-full p-10">
          <ListTask />
        </div>
      </div> */
