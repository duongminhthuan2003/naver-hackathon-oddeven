function Square({value, handleClick, isWinning} : { value: number, handleClick: () => void, isWinning?: boolean }) {
    return (
        <button className={`flex h-16 w-16 justify-center items-center rounded-lg ${isWinning ? "bg-yellow-200" : ((value > 0 ? (value % 2 === 0 ? "bg-green-200" : "bg-blue-200") : "bg-gray-200 hover:bg-gray-300"))} transition-all`} onClick={() => {handleClick()}}>
            {value}
        </button>
    )
}

export default Square;
