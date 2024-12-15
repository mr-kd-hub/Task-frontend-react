import CreateTaskForm from './components/TaskForm';
import ListTask from './components/ListTask';
import { useDispatch } from 'react-redux';
import { logout } from './redux/slices/auth.slice';
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        navigate('/login'); // Redirect to login page
      };
  return (
    <div className="App p-10 justify-center">
     <button onClick={handleLogout}>Logout</button>
      <div className='w-full'>
        <CreateTaskForm />
      </div>
      <div className='w-full p-10'>
        <ListTask />
      </div>
    </div>
  )
}

export default Dashboard