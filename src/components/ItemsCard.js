import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import images from '../assets/images.jpg'

export default function MediaCard({ item }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="350"
                image={images}
                alt="shirt"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
                <Typography variant='h6'>{item.price}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Buy</Button>

            </CardActions>
        </Card>
    );
}
