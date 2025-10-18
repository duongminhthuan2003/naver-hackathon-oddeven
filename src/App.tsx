import './App.css'
import Board from "./components/board.tsx";
import {useEffect, useRef, useState} from "react";

function App() {
    const [board, setBoard] = useState(Array(25).fill(0));
    const [winner, setWinner] = useState<"odd" | "even" | null>(null);
    const [player, setPlayer] = useState<"odd" | "even" | null>(null);

    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (wsRef.current) {
            return;
        }
        const ws = new WebSocket('ws://localhost:8080');
        wsRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join"
            }));
        };

        ws.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data);

            switch (type) {
                case "welcome":
                    setPlayer(data.player);
                    if (data.board) {
                        setBoard(data.board);
                        winnerCalculate(data.board);
                    }
                    break;

                case "UPDATE":
                    setBoard(prevBoard => {
                        const newBoard = [...prevBoard];
                        newBoard[data.index] = data.value;
                        winnerCalculate(newBoard);
                        return newBoard;
                    });
                    break;

                default:
                    break;
            }
        }

        return () => {
            ws.close();
            wsRef.current = null;
        }
    }, []);

    const handleClick = (index : number) => {
        if (winner) return;

        wsRef.current?.send(JSON.stringify({
            type: "INCREMENT",
            data: {
                index: index,
            },
        }));
    }

    const winnerCalculate = (newBoard: number[]) => {
        const winnerSet = [
            [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
            [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
            [0,6,12,18,24], [4,8,12,16,20],
        ]

        for (const set of winnerSet) {
            const allOdd = set.every(index => newBoard[index] % 2 === 1);
            const allEven = set.every(index => (newBoard[index] % 2 === 0 && newBoard[index] > 0));

            if (allOdd) {
                setWinner("odd");
                return;
            }

            if (allEven) {
                setWinner("even");
                return;
            }
        }
    }

    const handleReset = () => {
        setBoard(Array(25).fill(0));
        setWinner(null);
    }

    return (
    <div>
        <div className="text-2xl font-bold mb-4">{winner === "odd" ? "Odd wins" : (winner === "even" ? "Even wins" : null)}</div>
        <div>You are {player}</div>
        <Board board={board} handleClick={handleClick} />
        <button onClick={() => {handleReset()}}>Reset</button>
    </div>
  )
}

export default App
