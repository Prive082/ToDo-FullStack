import './App.css';
import axios from "axios";
import { useEffect, useState} from 'react';

function App() {
  const [listOfTasks, setListOfTasks] = useState([{task: ''}]);

  console.log(listOfTasks);
  
  const handleTaskAdd = () => {
    setListOfTasks([...listOfTasks, {task: ''}])
  }

  const handleTaskRemove = (index) => {
    const list = [...listOfTasks]
    list.splice(index, 1)
    setListOfTasks(list)
  }

  const handleTaskChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...listOfTasks];
    list[index][name] = value;
    setListOfTasks(list);
  }

  const onSubmit = async (e, index) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    const name = 'task'; // Assuming 'name' is always 'task'
    const value = listOfTasks[index].task; // Get the value from the listOfTasks array
  
    try {
      const resp = await axios.post("http://localhost:3001/tasks", { Task: value });
      console.log("Post request successful", resp.data);
      // You can update your UI or do something else here on successful post
    } catch (error) {
      console.error("Error making POST request", error);
      // Handle errors here, e.g., show an error message to the user
    }
  };
  
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <form className="App">
      <header>
      <button type='button' className='removeAll-button'
            onClick={refreshPage}>
              <span>Clear All Tasks</span>
            </button>
      </header>
      <div className='form-field'>
        <label htmlFor='task'>Task(s)</label>
        {listOfTasks.map((singleTask, index) => (
          <div key = {index} className='tasks'>
          <div className='first-division'>
            <input name='task' type='text' id='task' required 
            value = {singleTask.task}
            onChange={(e) => handleTaskChange(e, index)}
            />
            <button type='button' className='submit-button' required 
            value = {singleTask.task}
            onClick={(e) => onSubmit(e,index)}>
              <span>Submit</span>
            </button>
            {listOfTasks.length - 1 === index &&
            (
            <button type='button' className='add-button'
            onClick={handleTaskAdd}>
              <span>Add a Task</span>
            </button>
            )}
          </div>
          <div className='second-division'>
          {listOfTasks.length > 1 &&  
            (<button type='button' className='remove-button'
            onClick={() => handleTaskRemove(index)}>
              <span>Remove</span>
            </button>
            )}
          </div>
        </div>
        ))}   
      </div>
    </form>
  );
}

export default App;
