import { Container } from '@mui/material'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import axios from 'axios'


const fetchPaytmParams = async (token, order_id) => {

    const payload = { "order_id": order_id }
    const authToken = `Token ${token}`

    let headersList = {
        "Authorization": authToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    let reqOptions = {
        url: "http://127.0.0.1:8000/get_paytm_creditionals/",
        method: "POST",
        headers: headersList,
        data: JSON.stringify(payload)
    }

    const response = await axios.request(reqOptions)
    console.log(response.data)

    return response.data
}
function PaymentGateway({ token }) {
    const { order_id } = useParams()
    const formRef = useRef(null)
    const { data: paytmParams, isLoading, mutate } = useMutation(({ token, order_id }) => fetchPaytmParams(token, order_id))
    useEffect(() => {
        const getCredtionals = async () => {
            fetchCredtionals()
            await formRef.current.submit()
        }
        getCredtionals()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchCredtionals = () => {
        mutate({ token, order_id })
    }

    if (isLoading) {
        return <h1>Please do not refresh this page...</h1>
    }
    return (

        <Container>

            <form ref={formRef} method="post" action="https://securegw-stage.paytm.in/order/process/" name='f1'>

                <input type="hidden" name="MID" value={paytmParams?.MID} />
                <input type="hidden" name="WEBSITE" value={paytmParams?.WEBSITE} />
                <input type="hidden" name="ORDER_ID" value={paytmParams?.ORDER_ID} />
                <input type="hidden" name="CUST_ID" value={paytmParams?.CUST_ID} />
                <input type="hidden" name="INDUSTRY_TYPE_ID" value={paytmParams?.INDUSTRY_TYPE_ID} />
                <input type="hidden" name="CHANNEL_ID" value={paytmParams?.CHANNEL_ID} />
                <input type="hidden" name="TXN_AMOUNT" value={paytmParams?.TXN_AMOUNT} />
                <input type="hidden" name="CALLBACK_URL" value={paytmParams?.CALLBACK_URL} />
                <input type="hidden" name="CHECKSUMHASH" value={paytmParams?.CHECKSUMHASH} />


            </form>


        </Container>
    )
}

export default PaymentGateway
