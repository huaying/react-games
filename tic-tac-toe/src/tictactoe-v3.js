import React, { useState, useRef, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Strategy } from "./ai";
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

const initState = {
  grid: Array(9).fill(null),
  turn: null,
  gameStatus: GameStatus.Init,
  winner: null,
  you: null
};

const initCheck = {
  rows: Array(3).fill(0),
  cols: Array(3).fill(0),
  diagonal: 0,
  antiDiagonal: 0,
  total: 0
};

function TicTacToe() {
  const [state, setState] = useState(initState);
  const check = useRef(null);
  const { grid, turn, gameStatus, winner, you } = state;

  useEffect(() => {
    if (turn !== you && gameStatus === GameStatus.Playing)
      setTimeout(aiMove, 500);
  }, [state]);

  const start = choice => {
    check.current = cloneDeep(initCheck);
    setState(preState => ({
      ...preState,
      grid: Array(9).fill(null),
      turn: "O",
      gameStatus: GameStatus.Playing,
      winner: null,
      you: choice
    }));
  };

  const move = pos => {
    if (grid[pos] === null) {
      const newGrid = [...grid];
      const [gameStatus, winner] = gameCheck(pos);

      let nextTurn = turn === "O" ? "X" : "O";
      if (gameStatus !== GameStatus.Playing) {
        nextTurn = null;
      }

      newGrid[pos] = turn;
      setState(preState => ({
        ...preState,
        grid: newGrid,
        gameStatus,
        turn: nextTurn,
        winner
      }));
    }
  };

  const youMove = pos => {
    const { turn, you } = state;
    if (turn === you) move(pos);
  };

  const aiMove = () => {
    const pos = Strategy.random(state.grid);
    move(pos);
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
    <div className="container">
      <div className="box">
        <div className="row">
          <Block pos={0} grid={grid} onClick={youMove} />
          <Block pos={1} grid={grid} onClick={youMove} />
          <Block pos={2} grid={grid} onClick={youMove} />
        </div>
        <div className="row">
          <Block pos={3} grid={grid} onClick={youMove} />
          <Block pos={4} grid={grid} onClick={youMove} />
          <Block pos={5} grid={grid} onClick={youMove} />
        </div>
        <div className="row">
          <Block pos={6} grid={grid} onClick={youMove} />
          <Block pos={7} grid={grid} onClick={youMove} />
          <Block pos={8} grid={grid} onClick={youMove} />
        </div>
      </div>
      {gameStatus !== GameStatus.Playing && <div className="overlay" />}
      {gameStatus === GameStatus.Init && (
        <div className="panel">
          <div>Tic Tac Toe</div>
          <div className="actions">
            <div className="start-btn" onClick={() => start("O")}>
              O
            </div>
            <div className="start-btn" onClick={() => start("X")}>
              X
            </div>
          </div>
        </div>
      )}
      {gameStatus === GameStatus.End && (
        <div className="panel">
          <div>{winner ? `Winner: ${winner}` : "Draw"}</div>
          <div className="actions">
            <div className="start-btn" onClick={() => start("O")}>
              O
            </div>
            <div className="start-btn" onClick={() => start("X")}>
              X
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
