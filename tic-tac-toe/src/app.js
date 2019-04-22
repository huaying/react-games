import React from "react";
import TicTacToe from "./tictactoe-v2";
import TicTacToeAI from "./tictactoe-v3";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";

import "./app.css";

function Menu() {
  return (
    <div className="menu">
      <NavLink exact to="/">
        Easy
      </NavLink>
      <NavLink to="/impossible/">Impossible</NavLink>
      <NavLink to="/2players/">2 Players</NavLink>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <Menu />
        <Switch>
          <Route
            path="/impossible/"
            exact
            render={() => <TicTacToeAI difficulty="impossible" />}
          />
          <Route path="/2players/" exact component={TicTacToe} />
          <Route path="/" render={() => <TicTacToeAI key="default" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
