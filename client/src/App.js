import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './fontello/css/fontello.css';
import AddTodo from './components/AddTodo/script';
import TaskList from './components/TaskList/script';

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
    this.getTodos = this.getTodos.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getTodos = () => {
    fetch(`${url}/todos`, {
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
    axios.post(`${url}/addTodo`, newTodo);
    let fakeID = this.state.todos.length;
    newTodo._id = fakeID;
    let todosCopy = this.state.todos;
    todosCopy.push(newTodo);
    this.setState({ todos: todosCopy });
  }

  deleteTodo = idToDelete => {
    let objIdToDelete = null;
    this.state.todos.forEach(todo => {
      if (todo._id === idToDelete) {
        objIdToDelete = todo._id;
      }
    });
    axios.delete(`${url}/deleteTodo`, {
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

    axios.post(`${url}/updateTodo`, {
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
        <AddTodo placeholder="wut u gon do 2day?" addNewTodo={this.addNewTodo}/>
        <TaskList todos={this.state.todos} deleteTodo={this.deleteTodo} completeTodo={this.completeTodo}/>
      </div>
    );
  }
}

export default App;