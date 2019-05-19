import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// router library to simulate backend
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import './App.css';
import Header from './components/layout/Header';
import axios from 'axios'; // backend library


class App extends React.Component {
// define the todo states here:
    state = {
      todos: []
    }

    componentDidMount(){ // import 10 todos from axios
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(res => this.setState({ todos: res.data }))
    }

    // this will toggle the todo complete
    markComplete = (id) => {
      this.setState({todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      }) });
    }

    // delete todo
    delTodo = (id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id 
        !== id)] }));
    }

    // add todo
    addTodo = (title) => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: title,
        completed: false
      })
        .then(res => this.setState({ 
          todos: [...this.state.todos, res.data] }));
    }

    render() {
      return (
        <Router>
          <div className="App">
            <div className='container'>
              <Header/>
              <Route exact path="/" render = {props => (
                <React.Fragment>
                    <AddTodo addTodo={this.addTodo}/>
                    <Todos todos={this.state.todos} markComplete ={this.markComplete}
                    delTodo={this.delTodo} /> {/*todos component, passing state as props */}
                </React.Fragment>
              )} />
              <Route path="/About" component = {About}/>
             </div> 
            </div>
          </Router>
    );
  }
}

export default App;
