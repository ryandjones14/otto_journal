import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };

    // This binding is necessary to make `this` work in the callback
    // this.handleChange = this.handleChange.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    const tasks = this.getTasks();
    if (tasks) {
      this.setState(state => ({
        tasks: tasks
      }));
    }
  }

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getTasks = () => {
    fetch("http://localhost:3001/api/tasks", {
      crossDomain: true
    })
      .then(data => data.json())
      .then(res => this.setState({ tasks: res.data }));
  };

  addTodoItem(newItem) {
    const newId = this.state.tasks.length;
    let newTask = {
      id: newId,
      task: newItem
    };
    let items = this.state.tasks.concat(newTask);
    this.setState({
      tasks: items
    });
  }

  render() {
    return (
      <div>
        <AddTodo placeholder='wut u gon do 2day?' addTodoItem={this.addTodoItem}/>
        <TaskList tasks={this.state.tasks} />
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
    this.props.addTodoItem(newTask);
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
  const items = props.tasks;
  const listItems = items.map((item) => {
    return (
      <li key={item.id} className="task">
        <Todo task={item.task} />
      </li>
    );
  });

  return (
    <ul>{listItems}</ul>
  );
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { task: props.task };
  }

  render() {
    return (
      <div>
        <input type="checkbox"/>{this.state.task}
      </div>
    )
  }
}

export default App;
