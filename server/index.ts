//bun prisma migrate dev --name init 
//bun prisma generate
//npx prisma db seed

import { init } from '@stricjs/app';

init({ 
    routes: ['./src'],
    serve: {
        port:3001,
    }
});
