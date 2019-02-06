import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './fontello/css/fontello.css';

const url = 'http://localhost:3001/api';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };

    // This binding is necessary to make `this` work in the callback
    // this.handleChange = this.handleChange.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getTasks = () => {
    fetch("http://localhost:3001/api/todos", {
      crossDomain: true
    })
      .then(data => data.json())
      .then(res => this.setState({ todos: res.data }));
  };

  addNewTodo(newTask) {
    let newTodo = {
      task: newTask,
      isComplete: false
    };
    axios.post(`${url}/addTodo`, newTodo).then(() => {
      this.getTasks();
    });
  }

  deleteTodo = idToDelete => {
    let objIdToDelete = null;
    this.state.todos.forEach(todo => {
      if (todo._id === idToDelete) {
        objIdToDelete = todo._id;
      }
    });
    axios.delete("http://localhost:3001/api/deleteTodo", {
      data: {
        id: objIdToDelete
      }
    }).then(() => {
      const todos = this.state.todos;
      const todoIndex = todos.findIndex(todo => {
        return todo._id === idToDelete;
      });
      todos.splice(todoIndex, 1);
      this.setState({ todos: todos });
    });
  };
  
  completeTodo = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    let status = null;
    this.state.todos.forEach(todo => {
      if (todo._id === idToUpdate) {
        objIdToUpdate = todo._id;
        status = !todo.isComplete;
      }
    });

    axios.post("http://localhost:3001/api/updateTodo", {
      id: objIdToUpdate,
      update: { isComplete: status }
    }).then(() => {
      const todos = this.state.todos;
      const todoIndex = todos.findIndex(todo => {
        return todo._id === idToUpdate;
      });
      const newStatus = !todos[todoIndex].isComplete;
      todos[todoIndex].isComplete = newStatus;
      this.setState({ todos: todos });
    });
  };

  render() {
    return (
      <div>
        <AddTodo placeholder='wut u gon do 2day?' addNewTodo={this.addNewTodo}/>
        <TaskList todos={this.state.todos} deleteTodo={this.deleteTodo} completeTodo={this.completeTodo}/>
      </div>
    );
  }
}

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
      value: '',
    };

    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);    
  }

  handleChange(e) {
    const newValue = e.target.value;
    this.setState(state => ({
      value: newValue
    }));
  }
  addTodo() {
    const newTask = this.state.value;
    if (newTask === '') return;
    this.props.addNewTodo(newTask);
    this.setState(state => ({
      value: ''
    }));
  }
  render() {
    return (
      <div className='add-todo'>
        <input className='add-todo-input' type='text' placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange}/>
        <button className='add-todo-btn icon-plus' onClick={this.addTodo}></button>
      </div>
    );
  }
}

function TaskList(props) {
  const listTodos = props.todos.map((todo, i) => {
    return (
      <li key={todo._id}>
        <Todo
          task={todo.task}
          id={todo._id}
          isComplete={todo.isComplete}
          deleteTodo={props.deleteTodo}
          completeTodo={props.completeTodo}/>
      </li>
    );
  });
  return (
    <ul className='todo-list'>{listTodos}</ul>
  );
}

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

export default App;
