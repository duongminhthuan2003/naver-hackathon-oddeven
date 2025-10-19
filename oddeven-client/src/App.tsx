import './App.css'
import Board from "./components/board.tsx";
import {useEffect, useRef, useState} from "react";

function App() {
    const [board, setBoard] = useState(Array(25).fill(0));
    const [winner, setWinner] = useState<"odd" | "even" | null>(null);
    const [player, setPlayer] = useState<"odd" | "even" | null>(null);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);
    const [reject, setReject] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [disconnect, setDisconnect] = useState(false);

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
                    }
                    setWinner(data.winner ?? null);
                    setWinningLine(data.winningLine ?? null);
                    setReject(false);
                    break;

                case "REJECT":
                    setReject(true);
                    break;

                case "START":
                    setGameStarted(true);
                    setDisconnect(false);
                    setWinner(null);
                    setWinningLine(null);
                    break;

                case "WAITING":
                    setGameStarted(false);
                    break;

                case "UPDATE":
                    setBoard(prevBoard => {
                        const newBoard = [...prevBoard];
                        newBoard[data.index] = data.value;
                        return newBoard;
                    });
                    break;

                case "GAME_OVER":
                    setWinner(data.winner);
                    setWinningLine(data.winningLine);
                    setGameStarted(false);
                    if (data?.reason === "disconnected") {
                      setDisconnect(true);
                    }
                    break;

                case "SYNC":
                    setBoard(data.board);
                    setWinner(data.winner ?? null);
                    setWinningLine(data.winningLine ?? null);
                    setDisconnect(false);
                    setGameStarted(false);
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
        if (winner || !gameStarted || disconnect) return;

        wsRef.current?.send(JSON.stringify({
            type: "INCREMENT",
            data: {
                index: index,
            },
        }));
    }

    const handleReset = () => {
        wsRef.current?.send(JSON.stringify({
            type: "RESET",
        }));
    }

    return (
    <div>
        <p className="text-center text-2xl md:text-3xl font-bold mb-3 mt-20">Odd-even - By DMT</p>

        <div className="flex justify-center items-center">You are <div className="bg-blue-200 px-3 py-1 mx-1.5 rounded-lg">{player}</div> player</div>

        <div className="flex justify-center items-center mt-2">
            <div className="text-lg font-bold">{
                winner === "odd" ? "Odd wins" : (winner === "even" ? "Even wins" : null)
            }</div>
        </div>

        <div className="w-fit h-fit mx-auto mt-4">
            <Board board={board} handleClick={handleClick} winningLine={winningLine}/>
        </div>
        {reject && (
            <div className='bg-white/80 w-full h-full absolute top-0 left-0 flex justify-center items-center z-20'>You are rejected because the server is full</div>
        )}

        {disconnect && (
            <div className='bg-white/80 w-full h-full absolute top-0 left-0 flex justify-center items-center z-20'>Opponent disconnected from the server</div>
        )}
        <div className="flex justify-center items-center mt-3">
            {winner && (
                <button className="w-fit px-3 py-2 border-1 rounded-lg" onClick={() => {handleReset()}}>New game</button>
            )}
        </div>

    </div>
  )
}

export default App
