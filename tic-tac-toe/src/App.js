import React, { Component } from "react";
import "./App.css";

function Block({ pos, grid, onClick }) {
  return (
    <div className="block" onClick={() => onClick(pos)}>
      {grid[pos]}
    </div>
  );
}

class App extends Component {
  state = {
    grid: Array(9).fill(null),
    turn: "O"
  };

  move = pos => {
    const { grid, turn } = this.state;

    if (grid[pos] === null) {
      const newGrid = [...grid];

      newGrid[pos] = turn;
      this.setState({ grid: newGrid, turn: turn === "O" ? "X" : "O" });
    }
  };

  render() {
    const { grid } = this.state;

    return (
      <div className="container">
        <div className="box">
          <div className="row">
            <Block pos={0} grid={grid} onClick={this.move} />
            <Block pos={1} grid={grid} onClick={this.move} />
            <Block pos={2} grid={grid} onClick={this.move} />
          </div>
          <div className="row">
            <Block pos={3} grid={grid} onClick={this.move} />
            <Block pos={4} grid={grid} onClick={this.move} />
            <Block pos={5} grid={grid} onClick={this.move} />
          </div>
          <div className="row">
            <Block pos={6} grid={grid} onClick={this.move} />
            <Block pos={7} grid={grid} onClick={this.move} />
            <Block pos={8} grid={grid} onClick={this.move} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
