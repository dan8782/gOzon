import { routes } from '@stricjs/app';
import { handleLogin, handleSignup, handleProducts, handleProductById, handleGetUserCart, handleUpdateCart, handleRemoveFromCart, handleGetUserOrders, handleCreateOrder } from './handlers';
import * as send from '@stricjs/app/send';

const commonCORSHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Credentials': 'true',
};

const handleCORSOptions = (path: string) => () => send.head({ headers: commonCORSHeaders });

export default routes()
    .options('/login', handleCORSOptions('/login'))
    .options('/signup', handleCORSOptions('/signup'))
    .options('/my-orders', handleCORSOptions('/my-orders'))
    .options('/cart', handleCORSOptions('/cart'))
    .options('/cart-remove', handleCORSOptions('/cart-remove'))
    .get('/', () => new Response('Response :) from /'))
    .post('/login', handleLogin)
    .post('/signup', handleSignup)
    .get('/products', handleProducts)
    .get('/products/:id', async (req) => handleProductById(parseInt(req.params.id)))
    .get('/my-orders', handleGetUserOrders)
    .post('/my-orders', handleCreateOrder)
    .get('/cart', handleGetUserCart)
    .put('/cart', handleUpdateCart)
    .put('/cart-remove', handleRemoveFromCart)
    .get('/*', () => new Response('No handler found!', { status: 404 }));
