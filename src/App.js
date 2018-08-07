import React, { Component } from 'react';
import './App.css';
import { Card } from './components/Cards';
import { Form } from './components/Form';
import { GetTodos, PriorityColorCodes } from "./store/index";
import Storage from './storage/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: GetTodos(), showCreateTodoForm: false, taskPriority: PriorityColorCodes() };
    this.dragEventHandler = this.dragEventHandler.bind(this);
    this.storage = new Storage();
  }

  dragEventHandler(data) {
    let todos = this.state.todos;
    let item = todos[data.fromCard].items.splice(data.fromItem, 1);
    todos[data.toCard].items.push(item[0]);
    this.setState({ todos: todos });
    this.updateTodoInLocalStorage(todos);
  }

  actionHandler(actionName, data) {
    switch (actionName) {
      case 'drag':
        this.dragEventHandler(data);
        break;
      case 'deletecard':
        this.deleteCard(data.index);
        break;
      case 'createtask':
        this.createTask(data.cardIndex, data.task);
        break;
      case 'deletetask':
        this.deleteTask(data);
        break;
      default:
        break;
    }
  }

  toggleForm() {
    this.setState({ showCreateTodoForm: !this.state.showCreateTodoForm, cardName: '' });
  }

  createTask(index, task) {
    let todos = this.state.todos;
    let todo = this.state.todos[index];
    let nextId = todo.items.length + 1;
    nextId = 'I' + nextId;
    let item = { id: nextId, task: task.name, priority: this.state.taskPriority[task.priorityId], dateTime: task.taskDateTime };
    todo.items.push(item);
    todos[index] = todo;
    this.setState({ todos: todos });
    this.updateTodoInLocalStorage(todos);
  }

  deleteTask(data) {
    let todos = this.state.todos;
    let todo = todos[data.cardId];
    todo.items.splice(data.taskId, 1);
    todos[data.cardId] = todo;
    this.setState({ todos: todos });
    this.updateTodoInLocalStorage(todos);
  }

  createCard(data) {
    let nextId = this.state.todos.length + 1;
    let todos = this.state.todos;
    nextId = 'c' + nextId;
    const todo = { id: nextId, title: data.name, items: [] };
    todos.push(todo);
    this.setState({ todos: todos });
    this.toggleForm();
    this.updateTodoInLocalStorage(todos);
  }

  deleteCard(index) {
    let todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({ todos: todos });
    this.updateTodoInLocalStorage(todos);
  };

  create(type, data) {
    this.createCard(data);
  }

  updateTodoInLocalStorage(newTodos) {
    this.storage.remoteItem('todos');
    this.storage.setItem('todos', newTodos, true);
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      if (!Notification) {
        console.log('Desktop notifications not available in your browser. Try Chromium.');
        return;
      }

      if (Notification.permission !== "granted")
        Notification.requestPermission();
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">

          <button className="btn btn-primary" onClick={this.toggleForm.bind(this)}>Create Todo</button>

          {this.state.showCreateTodoForm ? <Form formType="card" placeholder="Enter Card Name" create={this.create.bind(this)} /> : null}

          {this.state.todos.map((todo, index) => {
            return <Card todo={todo} key={index} actionHandler={this.actionHandler.bind(this)} todoId={index} createItem={this.props.create}></Card>
          })}
        </div>
      </div>
    );
  }
}

export default App;
