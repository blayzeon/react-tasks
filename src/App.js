import React, { useState, useRef, useEffect } from 'react'

function App() {
  const taskInput = useRef();
  const [tasks, setTasks] = useState([]);

  function handleAddTask() {
    const value = taskInput.current.value;
    const newKey = `${value}${setTasks.length}`; 
    if (value === '') return

    setTasks(prevTasks => {
      return [...prevTasks, <li key={newKey}>{value}</li>];
    });

    taskInput.current.value = null;
  }

  return (
    <>
      <ul>
        {tasks}
      </ul>
      <input ref={taskInput} type="text" placeholder="enter task" />
      <button onClick={handleAddTask} type="button">Submit Task</button>
    </>
  );
}

export default App;