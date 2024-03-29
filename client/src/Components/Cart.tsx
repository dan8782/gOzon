import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderBar from './HeaderBar';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Button,
} from '@mui/material';

interface CartPageProps {}

interface Product {
  id: number;
  name: string;
  image: string; // in base 64
  description: string;
  vendorInfo: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC<CartPageProps> = () => {
  const [cartItems, setCartItems] = useState<number[]>([]); // Array of product IDs
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0); // Add totalAmount to state
  const nameStorage = localStorage.getItem('name');

  useEffect(() => {
    const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalAmount(total); // Update totalAmount in state
  }, [products],)
  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<number[]>('http://localhost:3001/cart', {
          headers: {
            authorization: `Bearer ${nameStorage}`,
          },
        });

        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartItems();
  }, [nameStorage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRequests = cartItems.map((productId) =>
          axios.get<Product>(`http://localhost:3001/products/${productId}`)
        );

        const productsData = await Promise.all(productRequests);

        const productQuantityMap: Record<number, number> = {};
        cartItems.forEach((productId) => {
          productQuantityMap[productId] = (productQuantityMap[productId] || 0) + 1;
        });

        const processedProductIds = new Set<number>();

        setProducts(
          productsData.reduce((acc, response) => {
            const productId = response.data.id;

            if (!processedProductIds.has(productId)) {
              acc.push({
                ...response.data,
                quantity: productQuantityMap[productId] || 1,
              });

              processedProductIds.add(productId);
            }
            return acc;
          }, [] as Product[])
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems]);

  async function handleDelete(productId: number) {
    try {
      const response = await axios.put(
        'http://localhost:3001/cart-remove',
        { productId },
        {
          headers: {
            authorization: `Bearer ${nameStorage}`,
            productid: productId,
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prevCartItems) => prevCartItems.filter((id) => id !== productId));
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  }

  const handlePlaceOrder = async () => {
    const response = await axios.post(
        'http://localhost:3001/my-orders', 
        null,  // No request data in the body for this example
        {
          headers: {
            authorization: `${nameStorage}`,
          },
        }
      );
      setCartItems([]);
      setProducts([]);
    console.log(response.data)
  };

  return (
    <Container style={{ marginTop: 100 }}>
      <HeaderBar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cart
        </Typography>
        <List>
          {products.map((product) => (
            <ListItem key={product.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={product.name} src={product.image} />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {product.description}
                    </Typography>
                    <br />
                    Total Quantity: {product.quantity}
                  </>
                }
              />
              <Button onClick={() => handleDelete(product.id)}>Remove</Button>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Оформить заказ за {totalAmount}
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
