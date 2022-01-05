import ItemCard from './ItemsCard'
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';


const fetchItems = async () => {
    const res = await fetch('http://localhost:8000/api/items')
    const data = await res.json()
    return data
}


function Items() {
    const { data, isLoading, isError } = useQuery('getItems', fetchItems, {
        refetchOnWindowFocus: false,
        cacheTime: 3000
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Server Error</span>
    }

    return (
        <Container maxWidth='md' sx={{ mt: 2 }}>
            <Grid container spacing={{ xs: 2, md: 2, t: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Link to={`/product-detail/${item.id}`}><ItemCard item={item} /></Link>
                    </Grid>
                ))}

            </Grid>
        </Container>
    )
}

export default Items
