import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';

interface ProductCardProps {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description, price, onAddToCart }) => {
    const handleAddToCart = () => {
        onAddToCart(id);
    };

    return (
        <Card
            key={id}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    style={{ objectFit: 'cover', width: '100%' }}
                    src={image}
                    alt={name}
                />
                <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div style={{ marginTop: 'auto', padding: '1rem' }}>
                <Button size="small" color="primary" onClick={handleAddToCart}>
                    Добавить в корзину за {price} руб
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;
