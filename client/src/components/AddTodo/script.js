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
  addTodo(e) {
    e.preventDefault();
    const newTask = this.state.value;
    if (newTask === '') return;
    this.props.addNewTodo(newTask);
    this.setState(state => ({
      value: ''
    }));
  }
  render() {
    return (
      <div className="add-todo">
        <h1 className="title">otto</h1>
        <form className="add-todo-form">
          <input ref={input => input && input.focus()} className="add-todo-input" type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange} />
          <button type="submit" className="add-todo-btn icon-plus" onClick={this.addTodo}></button>
        </form>
      </div>
    );
  }
}

export default AddTodo;