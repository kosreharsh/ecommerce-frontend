import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'

function ItemCounter({ item, quantity, token }) {
    const [counter, setCounter] = useState(quantity)
    useEffect(() => {


        return async () => await updateQuantity()

        // eslint-disable-next-line
    }, [counter])
    const updateQuantity = async () => {
        console.log(item)
        const payload = { id: item.id, quantity: counter }
        const authToken = `Token ${token}`
        await fetch('http://localhost:8000/api/cart/updateQuantity/', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(payload)
        })
    }
    const increment = () => setCounter(previousState => Number(previousState) + 1)
    const decrement = () => setCounter(previousState => Number(previousState) - 1)

    return (
        <div style={{ 'display': 'flex' }}>
            <Typography variant='h2'> {item.name}</Typography>
            <div style={{ 'margin': 2 }}>
                <button onClick={decrement}>minus</button>
                <input type='number' value={counter} onChange={e => setCounter(e.target.value)} />
                <button onClick={increment}>plus</button>
            </div>
        </div>
    )
}

export default ItemCounter
