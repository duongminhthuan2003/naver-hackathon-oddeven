import Square from "./square.tsx";

function Board({ board, handleClick }: { board: (number)[], handleClick: (index: number) => void }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <Square value={board[0]} handleClick={() => {handleClick(0)}} />
                <Square value={board[1]} handleClick={() => {handleClick(1)}} />
                <Square value={board[2]} handleClick={() => {handleClick(2)}} />
                <Square value={board[3]} handleClick={() => {handleClick(3)}} />
                <Square value={board[4]} handleClick={() => {handleClick(4)}} />
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[5]} handleClick={() => {handleClick(5)}} />
                <Square value={board[6]} handleClick={() => {handleClick(6)}} />
                <Square value={board[7]} handleClick={() => {handleClick(7)}} />
                <Square value={board[8]} handleClick={() => {handleClick(8)}} />
                <Square value={board[9]} handleClick={() => {handleClick(9)}} />
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[10]} handleClick={() => {handleClick(10)}} />
                <Square value={board[11]} handleClick={() => {handleClick(11)}} />
                <Square value={board[12]} handleClick={() => {handleClick(12)}} />
                <Square value={board[13]} handleClick={() => {handleClick(13)}} />
                <Square value={board[14]} handleClick={() => {handleClick(14)}} />
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[15]} handleClick={() => {handleClick(15)}} />
                <Square value={board[16]} handleClick={() => {handleClick(16)}} />
                <Square value={board[17]} handleClick={() => {handleClick(17)}} />
                <Square value={board[18]} handleClick={() => {handleClick(18)}} />
                <Square value={board[19]} handleClick={() => {handleClick(19)}} />
            </div>
            <div className="flex flex-row gap-2">
                <Square value={board[20]} handleClick={() => {handleClick(20)}} />
                <Square value={board[21]} handleClick={() => {handleClick(21)}} />
                <Square value={board[22]} handleClick={() => {handleClick(22)}} />
                <Square value={board[23]} handleClick={() => {handleClick(23)}} />
                <Square value={board[24]} handleClick={() => {handleClick(24)}} />
            </div>
        </div>
    )
}

export default Board;
