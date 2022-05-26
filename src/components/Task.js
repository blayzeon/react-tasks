import React from 'react'

export default function Task( { task } ) {
    return (
    <li><label><input type="radio" name="task" id={task.id}/> {task.name}</label></li>
  )
}
