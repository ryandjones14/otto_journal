import React, { Component } from 'react';
import './style.css';

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
        <input className='add-todo-input' type='text' placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange} />
        <button className='add-todo-btn icon-plus' onClick={this.addTodo}></button>
      </div>
    );
  }
}

export default AddTodo;