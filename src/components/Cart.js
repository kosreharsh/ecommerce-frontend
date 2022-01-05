import { Container, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import ItemCounter from './ItemCounter'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));








const fetchItems = async (token) => {
    const authData = `Token ${token}`
    const res = await fetch('http://localhost:8000/api/cart', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authData
        }
    })
    const data = await res.json()
    return data
}

function Cart({ token }) {
    const { data: Items, isLoading } = useQuery(['getCartItems', token], () => fetchItems(token), {
        refetchOnWindowFocus: false,
        cacheTime: 3000
    })
    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <Container>
            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'marginTop': 10 }}>

                <Typography variant='h2' textAlign='center'>Your Cart </Typography>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Items</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">Price</StyledTableCell>
                                <StyledTableCell align="right">Total Price</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Items.map((cartItem, index) => (
                                <ItemCounter key={index} count={index} item={cartItem.item} StyledTableRow={StyledTableRow} StyledTableCell={StyledTableCell} quantity={cartItem.quantity} token={token} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ 'display': 'flex', 'justifyContent': 'flex-end', 'marginTop': 8 }}>

                    <button style={{ 'height': 40, 'marginRight': 7, 'padding': 5 }}><Link to='/'>Continue Shopping</Link ></button>
                    <button style={{ 'height': 40, 'marginRight': 7, 'padding': 5 }}><Link to='/address'>Go for Checkout</Link></button>
                </div>
            </div>
        </Container >
    )
}

export default Cart
