// первый раз создать .env файл
//bunx prisma migrate dev --name init 
//bunx prisma generate
//npx prisma db seed

import { init } from '@stricjs/app';

init({ 
    routes: ['./src'],
    serve: {
        port:3001,
    },
    
});
