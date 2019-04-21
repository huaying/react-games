import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import "./tictactoe.css";

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

class TicTacToe extends Component {
  initState = {
    grid: Array(9).fill(null),
    turn: "O",
    winner: null,
    gameStatus: GameStatus.Init
  };

  initCheck = {
    rows: Array(3).fill(0),
    cols: Array(3).fill(0),
    diagonal: 0,
    antiDiagonal: 0,
    total: 0
  };

  state = this.initState;
  check = this.initCheck;

  start = () => {
    this.check = cloneDeep(this.initCheck);
    this.setState({
      ...this.initState,
      gameStatus: GameStatus.Playing
    });
  };

  move = pos => {
    const { grid, turn } = this.state;

    if (grid[pos] === null) {
      const newGrid = [...grid];
      const [gameStatus, winner] = this.gameCheck(pos);

      newGrid[pos] = turn;
      this.setState({
        grid: newGrid,
        turn: turn === "O" ? "X" : "O",
        gameStatus,
        winner
      });
    }
  };

  gameCheck = pos => {
    const add = this.state.turn === "O" ? 1 : -1;
    const row = Math.floor(pos / 3);
    const col = pos % 3;

    this.check.rows[row] += add;
    this.check.cols[col] += add;
    if ([0, 4, 8].includes(pos)) this.check.diagonal += add;
    if ([2, 4, 6].includes(pos)) this.check.antiDiagonal += add;
    this.check.total++;

    if (
      Math.abs(this.check.rows[row]) === 3 ||
      Math.abs(this.check.cols[col]) === 3 ||
      Math.abs(this.check.diagonal) === 3 ||
      Math.abs(this.check.antiDiagonal) === 3
    ) {
      return [GameStatus.End, this.state.turn];
    }

    if (this.check.total === 9) {
      return [GameStatus.End, null];
    }

    return [GameStatus.Playing, null];
  };

  render() {
    const { grid, winner, gameStatus } = this.state;

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
        {gameStatus !== GameStatus.Playing && <div className="overlay" />}
        {gameStatus === GameStatus.Init && (
          <div className="panel">
            <div>Tic Tac Toe</div>
            <div className="start-btn" onClick={this.start}>
              Start
            </div>
          </div>
        )}
        {gameStatus === GameStatus.End && (
          <div className="panel">
            <div>{winner ? `Winner: ${winner}` : "Draw"}`}</div>
            <div className="start-btn" onClick={this.start}>
              Start Over
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TicTacToe;
