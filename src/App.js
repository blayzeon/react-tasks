import React, { useState, useRef } from 'react'
import TaskList from './components/TaskList'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const taskInput = useRef();
  const [tasks, setTasks] = useState([]);

  function handleAddTask() {
    const value = taskInput.current.value;
    if (value === '') return

    setTasks(prevTasks => {
      return [...prevTasks, {id: uuidv4(), name: value}];
    });

    taskInput.current.value = null;
  }

  function handleModifyTask() {   
    const taskElm = document.querySelector('input:checked');
    if (!taskElm) return

    const msg = `Enter the new name for the task or 'delete' to remove: `;
    const response = prompt(msg);
    if (!response) return;

    const newTasks = []
    tasks.forEach((task) => {
      const newTask = task;
      if (task.id === taskElm.getAttribute('id')) {
        if (response.toUpperCase() === "DELETE") return
        newTask.name = response;
      }
      newTasks.push(newTask);
    });

    setTasks(newTasks);
  }

  return (
    <>
      <ul><TaskList tasks={tasks} /></ul>
      <input ref={taskInput} type="text" placeholder="enter task" />
      <button onClick={handleAddTask} type="button">Submit Task</button>
      <div><button type="button" onClick={handleModifyTask}>Modify/Delete Tasks</button></div>
    </>
  );
}

export default App;