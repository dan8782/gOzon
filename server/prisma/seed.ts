import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    try {
        const Tesla = await prisma.product.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: 'Tesla',
                image: 'tesla.jpeg',
                description: 'Electric vehicle with cutting-edge technology and luxurious features.',
                vendorInfo: 'Tesla, Inc.',
                price: 2999000,
            },
        });
        const TouchPad = await prisma.product.upsert({
            where: { id: 2 },
            update: {},
            create: {
                name: 'Trackpad Apple',
                image: 'trackpad.jpeg',
                description: 'Multi-functional touchpad for enhanced user experience.',
                vendorInfo: 'High-quality touchpad from a reputable manufacturer.',
                price: 29990,
            },
        });

        const MacBook = await prisma.product.upsert({
            where: { id: 4 },
            update: {},
            create: {
                name: 'MacBook',
                image: 'macbook.jpeg',
                description: 'Powerful and sleek laptop for all your computing needs.',
                vendorInfo: 'Apple Inc.',
                price: 339900,
            },
        });

        const AppleTV = await prisma.product.upsert({
            where: { id: 5 },
            update: {},
            create: {
                name: 'Apple TV',
                image: 'appletv.jpeg',
                description: 'Smart TV entertainment with Apple ecosystem integration.',
                vendorInfo: 'Apple Inc.',
                price: 16460,
            },
        });

        const AppleVision = await prisma.product.upsert({
            where: { id: 6 },
            update: {},
            create: {
                name: 'Apple Vision',
                image: 'applevision.jpeg',
                description: 'Cutting-edge augmented reality glasses from Apple.',
                vendorInfo: 'Apple Inc.',
                price: 499990,
            },
        });

        const Xiaomi = await prisma.product.upsert({
            where: { id: 7 },
            update: {},
            create: {
                name: 'Xiaomi',
                image: 'xi.jpeg',
                description: 'Quality electronic product from Xiaomi.',
                vendorInfo: 'Xiaomi Corporation.',
                price: 9000,
            },
        });
        console.log('Product seed data created successfully!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
