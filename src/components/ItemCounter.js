import { useMutation } from 'react-query'


function ItemCounter({ item, count, quantity, token, StyledTableCell, StyledTableRow }) {
    const updateQuantity = async (token, item_id, itemCount) => {

        const payload = { quantity: itemCount, id: item_id }
        console.log(JSON.stringify(payload))
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


    const Mutation = useMutation(({ token, item_id, counter }) => updateQuantity(token, item_id, counter), {
        onSuccess: () => {
            console.log("Quantity updated")
        }
    })

    async function update(e) {
        var itemCount = e.target.value
        Mutation.mutate({ token, item_id: item.id, itemCount })
    }

    return (


        <StyledTableRow key={count}>
            <StyledTableCell component="th" scope="row">
                {item.name}
            </StyledTableCell>
            <StyledTableCell align="right"><input style={inputStyle} type='number' value={quantity} onChange={e => update(e)} /></StyledTableCell>
            <StyledTableCell align="right">{item.price}</StyledTableCell>
            <StyledTableCell align="right">{item.price * quantity}</StyledTableCell>

        </StyledTableRow>
    )
}

const inputStyle = {
    'height': 40,
    'width': 40,
    'padding': 5,
    'borderColor': 'lightblue'
}


export default ItemCounter
