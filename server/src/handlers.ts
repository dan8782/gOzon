import { PrismaClient } from "@prisma/client";
import fs from 'node:fs'

// сырая либа корс прописывается хедером в response XD
const prisma = new PrismaClient();

const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Authorization',
};

export async function handleLogin(req: Request): Promise<Response> {
    try {
        const { name, password } = await req.json();

        if (!name || !password) {
            return new Response('Login and password are required', { headers, status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { name },
        });

        if (!user || !user.password) {
            return new Response('Invalid login or password', { headers, status: 400 });
        }

        const isPasswordValid = await Bun.password.verify(password, user.password);

        if (!isPasswordValid) {
            return new Response('Invalid login or password', { headers, status: 401 });
        }

        return new Response('Login successful!', { headers, status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return new Response('Login error', { status: 400 });
    }
}


export async function handleSignup(req: Request): Promise<Response> {
    try {
        const { name, password } = await req.json();

        if (!name || !password) {
            return new Response('Login and password are required', { headers, status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                name: name,
            },
        });

        if (existingUser) {
            return new Response('User with this login already exists', { status: 400, headers });
        }

        const hash = await Bun.password.hash(password, {
            algorithm: "bcrypt",
        });

        await prisma.user.create({
            data: {
                name: name,
                password: hash,
            },
        });

        return new Response('User created!', { headers, status: 200 });
    } catch (error) {
        console.error('Signup error:', error);
        return new Response('Signup error', { status: 400 });
    }
}

export async function handleProducts(): Promise<Response> {
    try {
        const products: Array<any> = await prisma.product.findMany();
        // const foo = Bun.file(products.length); // relative to cwd
        for (const product of products) {
            const imageBuffer = fs.readFileSync(`public/images/${product.image}`);
            const base64Image = imageBuffer.toString('base64');
            product.image = `data:image/jpeg;base64,${base64Image}`;
        }

        return new Response(JSON.stringify(products), {
            headers
        });
    } catch (error) {
        console.error('Error handle products:', error);
        return new Response('Error handle products', { status: 500 });
    }
}

export async function handleProductById(productId: number): Promise<Response> {
    if (isNaN(productId) || productId <= 0) {
        return new Response('Invalid product ID', { status: 400, headers });
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    product!.image = `data:image/jpeg;base64,${(fs.readFileSync(`public/images/${product?.image}`)).toString('base64')}`;

    if (!product) {
        return new Response('Product not found', { status: 404, headers });
    }

    return new Response(JSON.stringify(product), {
        headers
    })
}

export async function handleGetUserCart(req: Request) {
    const Bearer: any = req.headers.get('authorization');
    const name = Bearer.replace(/^Bearer\s+/i, '');
    return new Response(JSON.stringify(await getUserCart(name)), { headers, status: 200 });
}

export async function getUserCart(username: string) {
    const user = await prisma.user.findUnique({
        where: { name: username },
    });

    if (!user) {
        return new Response('User not found', { headers });
    }

    return user.cart;
}

export async function handleUpdateCart(req: Request) {
    try {
        const Bearer: any = req.headers.get('authorization');
        const userId = Bearer.replace(/^Bearer\s+/i, '');
        const user = await prisma.user.findUnique({
            where: { name: userId },
        });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        const productid: any = req.headers.get('productid');

        const updatedCart = [...user.cart, parseInt(productid)]; // Add the product to the cart

        await prisma.user.update({
            where: { name: userId },
            data: { cart: updatedCart },
        });

        return new Response('Cart updated successfully', { status: 200, headers });
    } catch (error) {
        console.error('Error updating cart:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function handleRemoveFromCart(req: Request) {
    try {
        const Bearer: any = req.headers.get('authorization');
        const userId = Bearer.replace(/^Bearer\s+/i, '');

        const user = await prisma.user.findUnique({
            where: { name: userId },
        });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        const productid: any = req.headers.get('productid');
        const productIdNumber = parseInt(productid);

        const isProductInCart = user.cart.includes(productIdNumber);

        if (!isProductInCart) {
            return new Response('Product not found in the cart', { status: 404, headers });
        }

        const updatedCart = user.cart.filter((id) => id !== productIdNumber);

        await prisma.user.update({
            where: { name: userId },
            data: { cart: updatedCart },
        });

        return new Response('Product removed from the cart successfully', { status: 200, headers });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return new Response('Internal Server Error', { status: 500, headers });
    }
}

export async function handleGetUserOrders(req: Request) {
    try {
        const userId: any = req.headers.get('authorization');

        const user = await prisma.user.findUnique({
            where: { name: userId },
        });

        if (!user) {
            return new Response('User not found', { status: 404, headers });
        }

        // Fetch detailed information for each order
        const ordersInfo = await Promise.all(user.orders.map(orderId => getOrderInfo(orderId)));

        return new Response(JSON.stringify(ordersInfo), { status: 200, headers });
    } catch (error) {
        console.error('Error getting user orders:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}


export async function getOrderInfo(orderId: number) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return null; // Order not found
        }

        return order;
    } catch (error) {
        console.error('Error getting order info:', error);
        throw new Error('Internal Server Error');
    }
}



// создает заказ и очищает корзину
export async function handleCreateOrder(req: Request) {
    try {
        const userId: any = req.headers.get('authorization');

        if (!userId || userId.length === 0) {
            return new Response('User not authenticated', { status: 401, headers });
        }

        const user = await prisma.user.findUnique({
            where: { name: userId },
        });

        if (!user) {
            return new Response('User not found', { status: 404, headers });
        }

        const products = await prisma.product.findMany({
            where: { id: { in: user.cart } },
        });

        const cost = products.reduce((totalCost, product) => {
            const quantityInCart = user.cart.filter((productId) => productId === product.id).length;

            return totalCost + product.price * quantityInCart;
        }, 0);

        const newOrder = await prisma.order.create({
            data: {
                userid: user.id,
                cart: user.cart,
                cost: cost,
            },
        });

        await prisma.user.update({
            where: { name: userId },
            data: { orders: { push: newOrder.id }, cart: [] },
        });

        return new Response('Order created successfully', { status: 200, headers });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response('Internal Server Error', { status: 500, headers });
    }
}


// считает стоимость корзины 
export async function calculateCartCost(cart: number[]): Promise<number> {
    try {
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: cart,
                },
            },
        });

        const totalCost = products.reduce((sum, product) => sum + product.price, 0);

        return totalCost;
    } catch (error) {
        console.error('Error calculating cart cost:', error);
        throw new Error('Internal Server Error');
    }
}
