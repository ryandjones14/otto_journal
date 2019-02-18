import React, { Component } from 'react';
import Todo from '../Todo/script';
import './style.css';

function TaskList(props) {
  const listTodos = props.todos.map((todo, i) => {
    return (
      <li key={todo._id}>
        <Todo
          task={todo.task}
          id={todo._id}
          isComplete={todo.isComplete}
          deleteTodo={props.deleteTodo}
          completeTodo={props.completeTodo} />
      </li>
    );
  });
  return (
    <ul className='todo-list'>{listTodos}</ul>
  );
}

export default TaskList;