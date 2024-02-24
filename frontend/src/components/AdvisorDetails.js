

export default function AdvisorDetails({advise}){

    console.log("advise", advise)
    return(
        <div>
            <img src={advise.profileImg} alt="profile pic" /><br />
            Name: {advise.name} <br />
            Email: {advise.email}<br />
            Address: {advise.address}<br />
            <button>Send Requests</button>
            <br /><br />
        </div>
    )
}