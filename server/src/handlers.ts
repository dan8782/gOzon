import { PrismaClient } from "@prisma/client";
import * as send from '@stricjs/app/send';

const prisma = new PrismaClient();

export async function handleLogin(req: Request): Promise<Response> {
    try {
        const { name, password } = await req.json();

        if (!name || !password) {
            return new Response('Login and password are required', { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { name },
        });

        if (!user || !user.password) {
            return new Response('Invalid login or password', { status: 401 });
        }

        const isPasswordValid = await Bun.password.verify(password, user.password);

        if (!isPasswordValid) {
            return new Response('Invalid login or password', { status: 401 });
        }

        return new Response('Login successful!');
    } catch (error) {
        console.error('Login error:', error);
        return new Response('Login error', { status: 400 });
    }
}


export async function handleSignup(req: Request): Promise<Response> {
    try {
        const { name, password } = await req.json();

        if (!name || !password) {
            return new Response('Login and password are required', { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                name: name,
            },
        });

        if (existingUser) {
            return new Response('User with this login already exists', { status: 400 });
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

        const count = await prisma.user.count();
        console.log(`There are ${count} user in the database.`);

        return new Response('User created!');
    } catch (error) {
        console.error('Signup error:', error);
        return new Response('Signup error', { status: 400 });
    }
}

export async function handleProducts(): Promise<Response> {
    try {
        const products = await prisma.product.findMany();
        return send.json(products);
    } catch (error) {
        console.error('Error handle products:', error);
        return new Response('Error handle products', { status: 500 });
    }
}

export async function handleProductById(productId: number): Promise<Response> {
    if (isNaN(productId) || productId <= 0) {
        return new Response('Invalid product ID', { status: 400 });
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        return new Response('Product not found', { status: 404 });
    }

    return send.json(product);
}

export async function handleMyOrders(req: Request): Promise<Response> {
    try {
      const userId = parseInt(req.params.userId); // Предполагается, что userId передается в параметрах маршрута
  
      if (isNaN(userId) || userId <= 0) {
        return new Response('Invalid user ID', { status: 400 });
      }
  
      const userOrders = await prisma.orders.findMany({
        where: { userid: userId },
      });
  
      return new Response(JSON.stringify(userOrders));
    } catch (error) {
      console.error('Error handling user orders:', error);
      return new Response('Error handling user orders', { status: 500 });
    }
  }
  