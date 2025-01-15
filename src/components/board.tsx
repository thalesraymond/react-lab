import Square from "@/components/square";
import {useState} from "react";
import {array} from "ts-interface-checker";


export default function Board() {
    const [squares, setSquares] = useState<string[]>(Array(9).fill(null));

    const [xIsNext, setXIsNext] = useState<boolean>(true);

    let status = "Next player: " + (xIsNext ? "X" : "O");

    const winner = getGameWinner(squares);

    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(arrayIndex: number) {
        if(squares[arrayIndex] !== null || getGameWinner(squares) !== null) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[arrayIndex] = "X";
        } else {
            nextSquares[arrayIndex] = "O";
        }

        setXIsNext(!xIsNext);
        setSquares(nextSquares);
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square squareText={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square squareText={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square squareText={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square squareText={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square squareText={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square squareText={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square squareText={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square squareText={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square squareText={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

function getGameWinner(squares: string[]) : string | null {
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