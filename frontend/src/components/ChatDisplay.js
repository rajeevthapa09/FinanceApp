
export default function ChatDisplay({msg, sender, receiver}){

    console.log("I am here")
    return(
        <div>
            <p>Sender: {sender}</p>
            <p>Reciever: {receiver}</p>
            <p>Message: {msg.msg}</p>
            <p>--------</p>
        </div>
    )

}