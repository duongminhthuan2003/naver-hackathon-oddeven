function Square({value, handleClick} : { value: number, handleClick: () => void }) {
    return (
        <button className="flex h-16 w-16 justify-center items-center border-1" onClick={() => {handleClick()}}>
            {value}
        </button>
    )
}

export default Square;
