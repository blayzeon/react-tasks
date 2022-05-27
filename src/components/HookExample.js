import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function HookExample() {
    const [tasks, setTasks] = useState([]);
    const input = useRef();

    // takes tasks from useStates passed through TaskList and turns them into elements
    function Task ({ task }) {
        return (
            <li>
                <input type="radio" name="task" id={ task.id }/>
                { task.name }
            </li>
        )
    }

    // uses Task to create <li> elements for render.  The arguement is added on the <TaskList /> element
    function TaskList ( { tasks } ) {
        return (
            <ul>
                {tasks.map(task => {
                    return <Task key={ task.id } task={ task } />
                })}
            </ul>
        )
    }

    function handleAddTask() {
        const value = input.current.value;

        // prevent blank entries
        if (value === "") return

        // key is required for React, ID will be used to compare for modification/deletion
        const newTask = {id: uuidv4(), name: value};

        const newTasks = tasks.length > 0 ? [...tasks, newTask] : [newTask];
        setTasks(newTasks);

        // clear the input after submission
        input.current.value = null;
    }

    function handleModifyTask() {
        const checkedElm = document.querySelector('input:checked');
        if (!checkedElm) return; // nothing checked

        const response = prompt('Enter a new name for the task or "delete" to remove: ');
        if (!response) return // nothing entered

        /*
            Iterates through our list of tasks
            > If nothing has changed, it adds to the list as-is, React will not rerender
            > If the task is to be deleted, do not add to the list
            > If the task is to be modified, make the change and then add to the list
        */
        const newTasks = [];
        tasks.forEach((task) => {
            const newTask = task;
            if (task.id === checkedElm.id) {
                if (response.toUpperCase() === 'DELETE') return
                newTask.name = response;
            }

            newTasks.push(newTask);
        });

        setTasks(newTasks);
    }

    return (
        <div>
            <h2>Hooks:</h2>
            <TaskList tasks={ tasks }/>
            <input ref={input} placeholder="Add an item" />
            <button type="button" onClick={handleAddTask}>Submit</button>
            <div><button type="button" onClick={handleModifyTask}>Modify/Delete</button></div>
        </div>
    )
}
