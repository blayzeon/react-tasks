import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

// takes classes passed from ClassExample and creates <li> for render
const Overview = (props) => {
    const { tasks } = props;

    return (
        <ul>
            {tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <input id={task.id} type="radio" name="task" />
                        {task.text}
                    </li>
                )
            })}
        </ul>
    )
}

class ClassExample extends Component {
    constructor() {
        // super allows children to share properties of the parent
        super(); 

        // setState() but for classes
        this.state = {
            task: {
                text: '',
                id: uuidv4()
            },
            tasks: [],
        }
    }

    // sets the state for onSubmitTask to load into the tasks array
    handleChange = (e) => {
        this.setState({
            task : {
                text: e.target.value,
                id: this.state.task.id,
            }
        });
    }
    
    // adds the current setState to the tasks list and refreshes the default state
    onSubmitTask = (e) => {
        e.preventDefault();

        const checkedElm = document.querySelector('input:checked');

        if (checkedElm.id !== 'submit') {
            const newTasks = [];
            this.state.tasks.forEach((task) => {
                const taskToAdd = task;
                if (task.id === checkedElm.id) {
                    if (this.state.task.text === "") {
                        return
                    }
                    taskToAdd.text = this.state.task.text;
                }

                newTasks.push(taskToAdd);
            });
            this.setState({
                tasks: newTasks,
                task: { 
                    text: '',
                    id: uuidv4(),
                },
            });

        } else {
            if (this.state.task.text === '') return 
            this.setState({
            tasks: this.state.tasks.concat(this.state.task),
            task: { 
                text: '',
                id: uuidv4(),
            },
        });
        }
    }

    render() {
        const { task, tasks } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmitTask}>
                    <h2>Classes:</h2>
                    <Overview tasks={tasks} />
                    <input defaultChecked={true} id="submit" type="radio" name="task" /><label htmlFor="taskInput">Enter task: </label>
                    <input 
                        onChange={this.handleChange} 
                        value={task.text} 
                        type="text" 
                        id="taskInput" 
                        placeholder="Add/modify/delete"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default ClassExample;