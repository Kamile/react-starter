import React from "react";
import ReactDOM from "react-dom";
import { Grid, Navbar, Nav, NavItem, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }
  handleClick(i) {
    const squares = [...this.state.squares]; // spread to copy :-)
    if (calculateWinner(squares) || squares[i]) {
      return; // return if game won, or click on already clicked square
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Navbar collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand href="/">Tinkering Pad</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Navbar.Header>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavItem eventKey={1} href="#">
                Game
              </NavItem>
              <NavItem eventKey={2} href="#">
                Timer
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Jumbotron>
          <Grid>
            <h1>Noughts and Crosses</h1>
            <div className="game-board">
              <Board />
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));
registerServiceWorker();
