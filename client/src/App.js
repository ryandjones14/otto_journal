import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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
    const newId = this.state.todos.length;
    let newTodo = {
      id: newId,
      task: newTask,
      isComplete: false
    };
    this.postTodo(newTodo)
  }

  postTodo = newTodo => {
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
      this.getTasks();
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
      this.getTasks();
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
        <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.addTodo}>add</button>
      </div>
    );
  }
}

function TaskList(props) {
  const listTodos = props.todos.map((todo, i) => {
    return (
      <li key={todo._id} className='task-list'>
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
    <ul>{listTodos}</ul>
  );
}

function Todo(props) {
  function deleteTodo(idToDelete) {
    props.deleteTodo(idToDelete);
  };
  function completeTodo(idToUpdate) {
    props.completeTodo(idToUpdate);
  };
  return (
    <div className='task'>
      <input
        type="checkbox"
        onChange={() => completeTodo(props.id)}
        checked={props.isComplete}/>
      <p className={props.isComplete ? 'complete' : 'incomplete'}>
        {props.task}
      </p>
      <button onClick={() => deleteTodo(props.id)}>X</button>
    </div>
  )
}

export default App;
