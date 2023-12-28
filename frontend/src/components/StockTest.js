
import { useRef, useState } from "react";
import { getStockInfo } from "./network";
import PaymentTest from "./PaymentTest"

export default function StockTest(){

    const stockPrice = useRef();
    const [toggle, setToggle] = useState(false);
    const [displayCC, setDisplayCC] = useState(false);

    const [stock, setStock] = useState("");
    const change = (e) => {
        setStock(e.target.value)
    }

    const getStocks = async() => {
        try{
            const ret = await getStockInfo(stock);
            stockPrice.current.textContent = "Price is: $" + ret.ask[0];
            setToggle(true);

        }catch(error){
            alert("Invalid Stock")
        }
    }

    const makePayment = () => {
        setDisplayCC(true);
    }

    return(
        <div>
            <label>Search for Stock: </label><input type="text" value={stock} onChange={change} />
            <button onClick={getStocks}>submit</button>
            <div ref={stockPrice}></div>
            {toggle ? <button onClick={makePayment}>Buy</button> : ""}
            <br /><br />
            {displayCC ? <PaymentTest />: ""}
        </div>
    )
}