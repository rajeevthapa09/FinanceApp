
export default function ChatDisplay({msg}){

    console.log("I am here")
    return(
        <div>
            <p>Sender: "Test"</p>
            <p>Reciever: "TestReciever"</p>
            <p>Message: {msg.msg}</p>
            <p>--------</p>
        </div>
    )

}