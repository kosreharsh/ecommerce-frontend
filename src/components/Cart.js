import { Container } from '@mui/material'
import { useState, useEffect } from 'react'
import ItemCounter from './ItemCounter'

function Cart({ token }) {
    const [Items, setItems] = useState([])
    const [removeItem, setRemoveItem] = useState(false)
    useEffect(() => {
        const getItems = async () => {
            const getItem = await fetchItems()
            console.log(getItem)
            setItems(getItem)
        }
        getItems()
        // eslint-disable-next-line
    }, [removeItem])
    const fetchItems = async () => {
        const authData = `Token ${token}`
        const res = await fetch('http://localhost:8000/api/cart', {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': authData
            }
        })
        const data = await res.json()
        console.log(token)
        return data
    }
    const handleZeroCounter = () => {
        setRemoveItem(previousState => !previousState)
    }
    return (
        <Container>
            {Items.map((cartItem, index) => (

                <ItemCounter key={index} handleZeroCounter={handleZeroCounter} item={cartItem.item} quantity={cartItem.quantity} token={token} />
            ))}
        </Container>
    )
}

export default Cart
