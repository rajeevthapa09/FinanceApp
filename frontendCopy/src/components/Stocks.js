import { useRef, useState } from "react"
import { getStockInfo } from "./network";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";

export default function Stocks() {

    const stockPrice = useRef();
    const [toggle, setToggle] = useState(false);
    const [displayCC, setDisplayCC] = useState(false);

    const [stock, setStock] = useState("");
    const change = (e) => {
        setStock(e.target.value);
    }

    const getStocks = async () => {
        try {
            const ret = await getStockInfo(stock);
            stockPrice.current.textContent = "Price is: $" + ret.ask[0];
            setToggle(true);

        } catch (error) {
            alert("Invalid stock");
        }

    }

    let navigate = useNavigate();
    const makePayment = () => {
        setDisplayCC(true);
        // navigate("/makePayment")
    }

    return (
        <div>
            <label>Search for Stock: </label><input type="text" value={stock} onChange={change} />
            <button onClick={getStocks}>Submit</button>
            <div ref={stockPrice}></div>
            {toggle ? <button onClick={makePayment}>Buy</button> : ""}
            <br/><br/>
            {displayCC? <Payment /> : ""} 
        </div>
    )
}