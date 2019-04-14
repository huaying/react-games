import React, { Component } from "react";
import "./App.css";

function Block({ pos, grid, onClick }) {
  return (
    <div className="block" onClick={() => onClick(pos)}>
      {grid[pos]}
    </div>
  );
}

const GameStatus = {
  Init: "Init",
  Playing: "Playing",
  End: "End"
};

class App extends Component {
  state = {
    grid: Array(9).fill(null),
    turn: "O",
    gameStatus: GameStatus.Init
  };

  check = {
    rows: Array(3).fill(0),
    cols: Array(3).fill(0),
    diagonal: 0,
    antiDiagonal: 0,
    total: 0
  };

  move = pos => {
    const { grid, turn } = this.state;

    if (grid[pos] === null) {
      const newGrid = [...grid];
      const gameStatus = this.gameCheck(pos);
      console.log(gameStatus);

      newGrid[pos] = turn;
      this.setState({
        grid: newGrid,
        turn: turn === "O" ? "X" : "O",
        gameStatus
      });
    }
  };

  gameCheck = pos => {
    const add = this.state.turn === "O" ? 1 : -1;
    const row = Math.floor(pos / 3);
    const col = Math.floor(pos % 3);

    this.check.rows[row] += add;
    this.check.cols[col] += add;
    if ([0, 4, 8].includes(pos)) this.check.diagonal += add;
    if ([2, 4, 6].includes(pos)) this.check.antiDiagonal += add;
    this.check.total++;

    if (
      Math.abs(this.check.rows[row]) === 3 ||
      Math.abs(this.check.cols[col]) === 3 ||
      Math.abs(this.check.diagonal) === 3 ||
      Math.abs(this.check.antiDiagonal) === 3 ||
      this.check.total === 9
    ) {
      return GameStatus.End;
    }

    return GameStatus.Playing;
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
