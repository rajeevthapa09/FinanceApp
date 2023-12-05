

export default function BuySellStocks(){

    const getStocks = () => {

    }

    return(
        <div>
            <h2>Buy / Sell Stocks</h2>
            <label>Stocks: </label>
            <select>
                <option>Buy</option>
                <option>Sell</option>
            </select>
            <select>
                <option>Google</option>
                <option>Apple</option>
            </select>
            <button onClick={getStocks}>Submit</button>
        </div>
    )
}