import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };

    // This binding is necessary to make `this` work in the callback
    // this.handleChange = this.handleChange.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    this.getTasks();
    // if (todos) {
    //   this.setState(state => ({
    //     todos: todos
    //   }));
    // }
  }

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getTasks = () => {
    fetch("http://localhost:3001/api/tasks", {
      crossDomain: true
    })
      .then(data => data.json())
      .then(res => this.setState({ todos: res.data }));
  };

  addTodoItem(newTodo) {
    // const newId = this.state.tasks.length;
    // let newTask = {
    //   id: newId,
    //   task: newItem
    // };
    // let items = this.state.tasks.concat(newTask);
    // this.setState({
    //   tasks: items
    // });
  }

  render() {
    return (
      <div>
        <AddTodo placeholder='wut u gon do 2day?' addTodoItem={this.addTodoItem}/>
        <TaskList todos={this.state.todos} />
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
    const newTodo = this.state.value;
    if (newTodo === '') return;
    this.props.addTodoItem(newTodo);
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
  const todos = props.todos;
  const listTodos = todos.map((todo) => {
    return (
      <li key={todo.id} className="task">
        <Todo task={todo.task} />
      </li>
    );
  });

  return (
    <ul>{listTodos}</ul>
  );
}

function Todo(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = { task: props.task };
  // }

    return (
      <div>
        <input type="checkbox"/>{props.task}
      </div>
    )
}

export default App;
