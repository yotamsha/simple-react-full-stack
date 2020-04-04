import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Profile_page from "./Profile_page";
import English_game from "./English_game";
import shop from "./shop";


class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="profile_page">
            <li><NavLink to="/profile_page">Profile_page</NavLink></li>
			</ul>
			<ul className="English_game">
            <li><NavLink to="/English_game">English_game</NavLink></li>
			</ul>
			<ul className="shop">
            <li><NavLink to="/shop">Shop</NavLink></li>
			</ul>
			<li><NavLink to="/containers/Login">Login</NavLink></li>
          
        <div className="content">
  <Route path="/profile_page" component={Profile_page}/>
  <Route path="/English_game" component={English_game}/>
  <Route path="/shop" component={shop}/>


</div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;