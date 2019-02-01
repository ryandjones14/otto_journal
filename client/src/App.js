import React, { Component } from 'react';
import axios from 'axios';

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
      task: newTask
    };
    this.postTodo(newTodo)
  }

  postTodo = newTodo => {
    console.log('newTodo1', newTodo, this);
    axios.post(`${url}/addTodo`, newTodo).then(() => {
      this.getTasks();
    });
  }

  deleteTodo = idTodelete => {
    console.log(idTodelete);
    let objIdToDelete = null;
    this.state.todos.forEach(todo => {
      if (todo.id === idTodelete) {
        objIdToDelete = todo.id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteTodo", {
      data: {
        id: objIdToDelete
      }
    });
  };
  

  render() {
    return (
      <div>
        <AddTodo placeholder='wut u gon do 2day?' addNewTodo={this.addNewTodo}/>
        <TaskList todos={this.state.todos} deleteTodo={this.deleteTodo}/>
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
      <div>
        <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.addTodo}>add</button>
      </div>
    );
  }
}

function TaskList(props) {
  console.log('props', props.todos);
  function deleteTodo() {
    props.deleteTodo();
  };
  const listTodos = props.todos.map((todo, i) => {
    return (
      <li key={todo._id} className="task">
        <Todo task={todo.task} />
        <button onClick={deleteTodo}>X</button>
      </li>
    );
  });
  return (
    <ul>{listTodos}</ul>
  );
}

function Todo(props) {
    return (
      <div>
        <input type="checkbox"/>{props.task}
      </div>
    )
}

export default App;
