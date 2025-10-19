import Square from "./square.tsx";

function Board({ board, handleClick, winningLine }: { board: (number)[], handleClick: (index: number) => void, winningLine: number[] | null }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <Square value={board[0]} handleClick={() => {handleClick(0)}} isWinning={winningLine?.includes(0)}/>
                <Square value={board[1]} handleClick={() => {handleClick(1)}} isWinning={winningLine?.includes(1)}/>
                <Square value={board[2]} handleClick={() => {handleClick(2)}} isWinning={winningLine?.includes(2)}/>
                <Square value={board[3]} handleClick={() => {handleClick(3)}} isWinning={winningLine?.includes(3)}/>
                <Square value={board[4]} handleClick={() => {handleClick(4)}} isWinning={winningLine?.includes(4)}/>
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[5]} handleClick={() => {handleClick(5)}} isWinning={winningLine?.includes(5)}/>
                <Square value={board[6]} handleClick={() => {handleClick(6)}} isWinning={winningLine?.includes(6)}/>
                <Square value={board[7]} handleClick={() => {handleClick(7)}} isWinning={winningLine?.includes(7)}/>
                <Square value={board[8]} handleClick={() => {handleClick(8)}} isWinning={winningLine?.includes(8)}/>
                <Square value={board[9]} handleClick={() => {handleClick(9)}} isWinning={winningLine?.includes(9)}/>
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[10]} handleClick={() => {handleClick(10)}} isWinning={winningLine?.includes(10)}/>
                <Square value={board[11]} handleClick={() => {handleClick(11)}} isWinning={winningLine?.includes(11)}/>
                <Square value={board[12]} handleClick={() => {handleClick(12)}} isWinning={winningLine?.includes(12)}/>
                <Square value={board[13]} handleClick={() => {handleClick(13)}} isWinning={winningLine?.includes(13)}/>
                <Square value={board[14]} handleClick={() => {handleClick(14)}} isWinning={winningLine?.includes(14)}/>
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[15]} handleClick={() => {handleClick(15)}} isWinning={winningLine?.includes(15)}/>
                <Square value={board[16]} handleClick={() => {handleClick(16)}} isWinning={winningLine?.includes(16)}/>
                <Square value={board[17]} handleClick={() => {handleClick(17)}} isWinning={winningLine?.includes(17)}/>
                <Square value={board[18]} handleClick={() => {handleClick(18)}} isWinning={winningLine?.includes(18)}/>
                <Square value={board[19]} handleClick={() => {handleClick(19)}} isWinning={winningLine?.includes(19)}/>
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[20]} handleClick={() => {handleClick(20)}} isWinning={winningLine?.includes(20)}/>
                <Square value={board[21]} handleClick={() => {handleClick(21)}} isWinning={winningLine?.includes(21)}/>
                <Square value={board[22]} handleClick={() => {handleClick(22)}} isWinning={winningLine?.includes(22)}/>
                <Square value={board[23]} handleClick={() => {handleClick(23)}} isWinning={winningLine?.includes(23)}/>
                <Square value={board[24]} handleClick={() => {handleClick(24)}} isWinning={winningLine?.includes(24)}/>
            </div>
        </div>
    )
}

export default Board;
