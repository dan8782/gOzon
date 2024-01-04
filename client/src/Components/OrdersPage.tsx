import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import HeaderBar from './HeaderBar';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface MyOrdersPageProps {}

interface Order {
  id: number;
  userid: number;
  cart: number[];
  cost: number;
  createdAt: string;
}

const MyOrdersPage: React.FC<MyOrdersPageProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const nameStorage = localStorage.getItem('name');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>('http://localhost:3001/my-orders', {
          headers: {
            authorization: `${nameStorage}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [nameStorage]);

  return (
    <Box sx={{ marginTop: 10, padding: 5 }}>
      <HeaderBar />
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {orders.length > 0 ? (
        <List>
          {orders.map((order) => (
            <ListItem key={order.id}>
              <ListItemText
                primary={`Order ID: ${order.id}`}
                secondary={`Cost: ${order.cost} | Date: ${new Date(order.createdAt).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No orders found.</Typography>
      )}
    </Box>
  );
};

export default MyOrdersPage;
