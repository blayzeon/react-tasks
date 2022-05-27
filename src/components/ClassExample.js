import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Overview = (props) => {
    const { tasks } = props;

    return (
        <ul>
            {tasks.map((task) => {
                return <li key={task.id}>{task.text}</li>
            })}
        </ul>
    )
}

class ClassExample extends Component {
    constructor() {
        super();

        this.state = {
            task: {
                text: '',
                id: uuidv4()
            },
            tasks: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            task : {
                text: e.target.value,
                id: this.state.task.id,
            }
        });
    }
    
    onSubmitTask = (e) => {
        e.preventDefault();
        this.setState({
            tasks: this.state.tasks.concat(this.state.task),
            task: { 
                text: '',
                id: uuidv4(),
            },
        });
    }

    render() {
        const { task, tasks } = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmitTask}>
                    <h2>Classes:</h2>
                    <Overview tasks={tasks} />
                    <label htmlFor="taskInput">Enter task: </label>
                    <input 
                        onChange={this.handleChange} 
                        value={task.text} 
                        type="text" 
                        id="taskInput" 
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>
        )
    }
}

export default ClassExample;