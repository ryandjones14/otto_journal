import React, { Component } from 'react';

const initialTasks = [
  {
    id: 0,
    task: 'clean dishes',
  },
  {
    id: 1,
    task: 'wash car',
  },
  {
    id: 2,
    task: 'take out trash',
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: initialTasks,
    };

    // This binding is necessary to make `this` work in the callback
    // this.handleChange = this.handleChange.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
  }

  addTodoItem(newItem) {
    const newId = this.state.tasks.length;
    let newTask = {
      id: newId,
      task: newItem
    };
    let items = this.state.tasks.concat(newTask);
    console.log('new items list', items);
    this.setState({
      tasks: items
    });
    console.log('new state', this.state);    
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
    console.log(e.target.value);
    const newValue = e.target.value;
    this.setState(state => ({
      value: newValue
    }));
  }
  addTodo() {
    console.log('value', this.state.value);
    const newTask = this.state.value;
    if (newTask === '') return;
    this.props.addTodoItem(newTask);
    this.setState(state => ({
      value: ''
    }));
  }
  render() {
    return (
      // <form onSubmit={this.addTodo}>
      //   <label>
      //     Name:
      //     <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange} />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>
      <div>
        <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.addTodo}>add</button>
      </div>
    );
  }
}

function TaskList(props) {
  const items = props.tasks;
  console.log('items 1', items);
  const listItems = items.map((item) => {
    console.log('items 2', item.task);    
    return (
      <li key={item.id}>
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
