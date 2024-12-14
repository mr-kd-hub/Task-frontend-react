// import logo from './logo.svg';
import './App.css';
import CreateTaskForm from './components/TaskForm';
import ListTask from './components/ListTask';

function App() {
  return (
    <div className="App p-10 justify-center">
      <div className='w-full'>
        <CreateTaskForm />
      </div>
      <div className='w-full p-10'>
        <ListTask />
      </div>
    </div>
  );
}

export default App;
