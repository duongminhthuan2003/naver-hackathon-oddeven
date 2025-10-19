function Square({value, handleClick, isWinning} : { value: number, handleClick: () => void, isWinning?: boolean }) {
    return (
        <button className={`flex h-16 w-16 justify-center items-center rounded-lg ${isWinning ? "bg-green-300" : "bg-gray-200 hover:bg-gray-300"} transition-all`} onClick={() => {handleClick()}}>
            {value}
        </button>
    )
}

export default Square;
