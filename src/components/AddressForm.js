import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useState } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import { CountryDropdown } from 'react-country-region-selector'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import history from 'history/browser'
// import Box from '@mui/material/Box'
// import TextField from '@mui/material/TextField'

async function FetchAddress(token) {
    const authData = `Token ${token}`
    const res = await fetch('http://127.0.0.1:8000/api/address/', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authData
        }
    })
    const data = await res.json()
    console.log(data)
    return data
}
async function FetchOrderId(token) {
    const authData = `Token ${token}`
    const res = await fetch('http://127.0.0.1:8000/api/myOrder/get_current_order/', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authData
        }
    })
    const data = await res.json()
    console.log(data)
    return data
}
async function addNewAddress(token, inputData) {
    const authToken = `Token ${token}`

    let headersList = {
        "Authorization": authToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    let reqOptions = {
        url: "http://127.0.0.1:8000/api/address/",
        method: "POST",
        headers: headersList,
        data: JSON.stringify(inputData)
    }

    axios.request(reqOptions).then(function (response) {
        console.log(response.data);
    })




}
async function userPreferredAddress(token, address_id, order_id) {
    const authToken = `Token ${token}`
    const payload = { id: address_id }
    const res = await fetch(`http://127.0.0.1:8000/api/myOrder/${order_id}/add_address/`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    return data
}

function AddressForm({ token }) {

    const [ShowAddressForm, setShowAddressForm] = useState(false)
    const [country, setCountry] = useState('')
    const { data: userAddress, isLoading, refetch } = useQuery(['getUserAddress', token], () => FetchAddress(token), {
        refetchOnWindowFocus: false,
        cacheTime: 3000
    })
    const { data: currentCart } = useQuery(['getOrderId', token], () => FetchOrderId(token), {
        refetchOnWindowFocus: false,
        cacheTime: 3000
    })
    const { register, handleSubmit } = useForm()
    const { register: register2, handleSubmit: handleSubmit2 } = useForm()
    const Mutation = useMutation(({ token, inputData }) => addNewAddress(token, inputData), {
        onSuccess: () => {
            console.log("new address added")
        }
    })
    const Mutation2 = useMutation(({ token, address_id, order_id }) => userPreferredAddress(token, address_id, order_id), {
        onSuccess: (data) => {

            history.push(`/payment/${data?.order_id}/`)
        }
    })
    if (isLoading) {
        return <span>Loading...</span>
    }

    const onSubmit = (formData) => {
        console.log(country)
        var inputData = { ...formData, 'country': country }
        console.log(inputData)
        Mutation.mutate({ token, inputData })
        refetch()
    }
    const onRadioSubmit = async (pAddress) => {
        let Aid = pAddress?.preferred_address
        let data = await userAddress.find(address => address.id === Number(Aid))

        const order_id = currentCart?.id
        let address_id = data?.id
        console.log(address_id)

        Mutation2.mutate({ token, address_id, order_id })


    }


    return (
        <Container>
            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'margin': 15 }}>
                <h1>Your Address</h1>
                <div style={{ 'display': 'flex', 'flexDirection': 'column', 'margin': 10 }} >
                    <h3>Saved Addresses</h3>
                    <div style={{ 'margin': 10 }}>
                        <form style={{ 'display': 'flex', 'flexDirection': 'column', }} onSubmit={handleSubmit2(onRadioSubmit)} >
                            {
                                userAddress.map((Address, index) => {
                                    return <SelectRadio key={index} uid={index} Address={Address} register={register2} />
                                })
                            }
                            <input type='submit' style={{ 'height': 30, 'width': 300 }} value='Use this Address' />
                        </form>
                    </div>
                    <p>--------OR--------</p>

                    <h3 style={{ 'marginTop': 10 }} onClick={() => setShowAddressForm(!ShowAddressForm)}><span><AddCircleIcon /></span>  Add new address</h3>
                    {ShowAddressForm && <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                        <input style={inputStyle} type='text' placeholder='Apartment Address' {...register("apartment_address")} />
                        <input style={inputStyle} type='text' placeholder='Street Address' {...register("street_address")} />
                        <div>
                            <input style={inputStyle} type='number' placeholder='Pincode' {...register("zipcode")} />
                            <CountryDropdown style={inputStyle} value={country} valueType="short"
                                onChange={(val) => setCountry(val)} />
                        </div>
                        <div style={{ 'margin': 4 }}>
                            <input type='checkbox' id='cbox' name='cbox'{...register('use_default_shipping')} />
                            <label htmlFor='cbox'>Set as Default Address</label>
                        </div>
                        <input style={inputStyle} type='submit' />
                    </form>
                    }
                </div>
            </div>


        </Container >
    )
}
function SelectRadio({ uid, Address, register }) {

    return (
        <div style={{ 'margin': 6 }}>
            <input type='radio' {...register('preferred_address')} name='preferred_address' value={Address?.id} id={uid} />
            <label style={{ 'marginLeft': 5 }} htmlFor={uid}>{Address?.apartment_address + ',' + Address?.street_address}</label>
        </div>
    )
}
var formStyle = {
    'display': 'flex',
    'flexDirection': 'column',
    'width': 550,
    'margin': 10
}
const inputStyle = {
    'marginTop': 5,
    'marginRight': 7,
    'padding': 6,
    'height': 35
}



export default AddressForm
