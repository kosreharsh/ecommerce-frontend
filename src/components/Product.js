import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import images from '../assets/images.jpg'
import { useQuery } from 'react-query'
function Product() {

    const { productId } = useParams()
    const { data, isLoading } = useQuery(['getProductDetail', productId], () => fetchDetail(productId), { refetchOnWindowFocus: false })
    const fetchDetail = async (productId) => {
        const res = await fetch(`http://127.0.0.1:8000/api/items/${productId}`)
        const data = await res.json()
        return data
    }
    if (isLoading) {
        return <span>Loading</span>
    }
    console.log(data)
    return (
        <Container maxWidth='md' sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <CardMedia
                        component="img"
                        height="350"
                        image={images}
                        alt="shirt"
                    />
                </Grid>
                <Grid item xs={6} md={8}>
                    <Box sx={{ mt: '2' }}>
                        <h1>{data?.name}</h1>
                        <h5>{data?.category}</h5>
                        <h3>{data?.price}</h3>

                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Product
