import { routes } from '@stricjs/app';
import { handleLogin, handleSignup, handleProducts, handleProductById, handleMyOrders } from './handlers';

export default routes()
    .get('/', () => new Response('Response :) from /'))
    .post('/login', handleLogin) // готова
    .post('/signup', handleSignup) // готово
    .get('/products', handleProducts) // возвращает json со всеми продуктами
    .get('/products/:id', async (req)=> handleProductById(parseInt(req.params.id))) // готово
    .get('/my-orders', () => new Response('orders server'))
    .post('/my-orders', () => new Response('orders server'))
    .get('/cart', () => new Response('cart server'))
    .post('/cart', () => new Response('cart server'))
    .put('/cart', () => new Response('cart server'))
    .get('/*', () => new Response('No handler found!'))
