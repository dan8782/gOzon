import { routes } from '@stricjs/app';
import { handleLogin, handleSignup, handleProducts, handleProductById, handleGetUserCart, handleUpdateCart, handleRemoveFromCart, handleGetUserOrders, handleCreateOrder } from './handlers';
import * as send from '@stricjs/app/send';

export default routes()
    .options('/login', () => send.head({
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    }))
    .options('/signup', () => send.head({
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    }))
    .options('/my-orders', () => send.head({
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    }))
    .options('/cart', () => send.head({
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Include the allowed methods
            "Access-Control-Allow-Credentials": "true"
        }
    }))
    .options('/cart-remove', () => send.head({
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Include the allowed methods
            "Access-Control-Allow-Credentials": "true"
        }
    }))
    .get('/', () => new Response('Response :) from /'))
    .post('/login', handleLogin,) // готова
    .post('/signup', handleSignup) // готово
    .get('/products', handleProducts) // возвращает json со всеми продуктами
    .get('/products/:id', async (req) => handleProductById(parseInt(req.params.id))) // готово
    .get('/my-orders', handleGetUserOrders) // возвращает айдишники ордеров
    .post('/my-orders', handleCreateOrder) // создает ордер из карт =)
    .get('/cart', handleGetUserCart) // работает
    .post('/cart', () => new Response('cart server'))
    .put('/cart', handleUpdateCart) // готово
    .put('/cart-remove', handleRemoveFromCart)// готово
    .get('/*', () => new Response('No handler found!'))