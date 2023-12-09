
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { paymentHandler } from './network';

//Card Number: 4111 1111 1111 1111, CVV: 111, Postal: 11111 (you can provide any postal code).

export default function Payment() {
    return (
        <div className={styles.container}>
            <PaymentForm
                applicationId="sandbox-sq0idb-kvgCIj7zhlw6wBraXsf3rw"
                // cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                //     console.log('token:', token);
                //     console.log('verifiedBuyer:', verifiedBuyer);
                // }}
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    // const response = await fetch("/api/pay", {
                    //   method: "POST",
                    //   headers: {
                    //     "Content-type": "application/json",
                    //   },
                    //   body: JSON.stringify({
                    //     sourceId: token.token,
                    //   }),
                    // });

                    // console.log(await response.json());
                    try{
                        const response = await paymentHandler({sourceId: token.token});
                        console.log("payment", response);
                        if(response){
                            alert("Payment Successful")
                        }
                    }catch(error){
                        console.log(error);
                    }
                    
                    
                  }}
                locationId='LH9HHZGA0BMHV'
            >

                <div style={{width: "400px"}}><CreditCard
                    buttonProps={{
                        css: {
                            backgroundColor: "#771520",
                            fontSize: "14px",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#530f16",
                            },
                        },
                    }}
                /></div>
            </PaymentForm>
        </div>
    )
}

const styles = {
    container: {
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "100px"
    }
}