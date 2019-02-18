import React, { Component } from 'react';
import './style.css';

function Todo(props) {
  function deleteTodo(idToDelete) {
    props.deleteTodo(idToDelete);
  };
  function completeTodo(idToUpdate) {
    props.completeTodo(idToUpdate);
  };
  const todoStatus = props.isComplete ? 'complete icon-emo-thumbsup' : 'incomplete';
  const doneBtnClasses = props.isComplete ? 'done icon-check' : 'done icon-check-empty';

  const deleteBtnClasses = 'delete icon-trash-empty';
  return (
    <div className='todo'>
      <p className={todoStatus}>
        {props.task}
      </p>
      <button
        className={doneBtnClasses}
        onClick={() => completeTodo(props.id)}>
      </button>
      <button
        className={deleteBtnClasses}
        onClick={() => deleteTodo(props.id)}>
      </button>
    </div>
  )
}

export default Todo;