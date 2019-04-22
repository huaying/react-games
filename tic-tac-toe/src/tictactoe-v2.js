import React, { useState, useRef } from "react";
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

const initCheck = {
  rows: Array(3).fill(0),
  cols: Array(3).fill(0),
  diagonal: 0,
  antiDiagonal: 0,
  total: 0
};

function TicTacToe() {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("O");
  const [gameStatus, setGameStatus] = useState(GameStatus.Init);
  const [winner, setWinner] = useState(null);
  const check = useRef(null);

  const start = () => {
    check.current = cloneDeep(initCheck);
    setGrid(Array(9).fill(null));
    setTurn("O");
    setGameStatus(GameStatus.Playing);
    setWinner(null);
  };

  const move = pos => {
    if (grid[pos] === null) {
      const newGrid = [...grid];
      const [gameStatus, winner] = gameCheck(pos);

      newGrid[pos] = turn;
      setGrid(newGrid);
      setTurn(turn === "O" ? "X" : "O");
      setGameStatus(gameStatus);
      setWinner(winner);
    }
  };

  const gameCheck = pos => {
    const add = turn === "O" ? 1 : -1;
    const row = Math.floor(pos / 3);
    const col = pos % 3;

    check.current.rows[row] += add;
    check.current.cols[col] += add;
    if ([0, 4, 8].includes(pos)) check.current.diagonal += add;
    if ([2, 4, 6].includes(pos)) check.current.antiDiagonal += add;
    check.current.total++;

    if (
      Math.abs(check.current.rows[row]) === 3 ||
      Math.abs(check.current.cols[col]) === 3 ||
      Math.abs(check.current.diagonal) === 3 ||
      Math.abs(check.current.antiDiagonal) === 3
    ) {
      return [GameStatus.End, turn];
    }

    if (check.current.total === 9) {
      return [GameStatus.End, null];
    }

    return [GameStatus.Playing, null];
  };

  return (
    <div className="game">
      <div className="box">
        <div className="row">
          <Block pos={0} grid={grid} onClick={move} />
          <Block pos={1} grid={grid} onClick={move} />
          <Block pos={2} grid={grid} onClick={move} />
        </div>
        <div className="row">
          <Block pos={3} grid={grid} onClick={move} />
          <Block pos={4} grid={grid} onClick={move} />
          <Block pos={5} grid={grid} onClick={move} />
        </div>
        <div className="row">
          <Block pos={6} grid={grid} onClick={move} />
          <Block pos={7} grid={grid} onClick={move} />
          <Block pos={8} grid={grid} onClick={move} />
        </div>
      </div>
      {gameStatus !== GameStatus.Playing && <div className="overlay" />}
      {gameStatus === GameStatus.Init && (
        <div className="panel">
          <div>Tic Tac Toe</div>
          <div className="start-btn" onClick={start}>
            Start
          </div>
        </div>
      )}
      {gameStatus === GameStatus.End && (
        <div className="panel">
          <div>{winner ? `Winner: ${winner}` : "Draw"}</div>
          <div className="start-btn" onClick={start}>
            Start Over
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
