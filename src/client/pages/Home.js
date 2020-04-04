import React, { Component } from "react";
import {
  Link,
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from "./LoginPage";
class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
    componentDidMount() {
      fetch('/api/users/currentUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.setState({user: data.user})
          if (!data.user) {
            window.location.href = '/login'
          }
        });
    }

    logout() {
      fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(data => {
          console.log(data)
          window.location.href = '/'
        });
    }

    render() {
      return (
        <div>
          <h2>home</h2>
          {!this.state.user && <Link to="/login">Login</Link>}
          {this.state.user && <button onClick={this.logout}>Logout</button>}

        </div>
      );
    }
  }
   
  export default HomePage;