import React, { Component } from "react";
import "./App.css";

function Block({ value }) {
  return <div className="block">{value}</div>;
}

class App extends Component {
  state = {
    grid: Array(9).fill("O")
  };

  render() {
    const { grid } = this.state;

    return (
      <div className="container">
        <div className="box">
          <div className="row">
            <Block value={grid[0]} />
            <Block value={grid[1]} />
            <Block value={grid[2]} />
          </div>
          <div className="row">
            <Block value={grid[3]} />
            <Block value={grid[4]} />
            <Block value={grid[5]} />
          </div>
          <div className="row">
            <Block value={grid[6]} />
            <Block value={grid[7]} />
            <Block value={grid[8]} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
