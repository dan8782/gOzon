## Описание
Пример моего приложения, использующего bun для серверной части, React и Material-UI для клиентской части, а также Prisma для работы с базой данных PostgreSQL.

![](contrib/about.gif)

## Установка

### Server
1. Установите bun:
    ```bash
    curl -fsSL https://bun.sh/install | bash
    ```

2. Установите зависимости сервера:
    ```bash
    cd server
    bun install
    ```

3. Создайте файл `.env` в корне сервера и укажите ваш `DATABASE_URL`:
    ```dotenv
    DATABASE_URL="postgresql://name:randompassword@localhost:5432/g0zon?schema=public"
    ```

4. Выполните миграции и сгенерируйте Prisma:
    ```bash
    bunx prisma migrate dev --name ready
    bunx prisma generate
    ```

5. Выполните сидирование базы данных:
    ```bash
    npx prisma db seed
    ```

### Client
1. Установите зависимости клиента:
    ```bash
    cd client
    npm i
    ```

## Запуск
Запустите сервер:
    ```npm
    run start
    ```

Откройте ваш браузер и перейдите по адресу `http://localhost:3000/` для просмотра вашего приложения.

## Технологии
- **Server**: Используется [bun](https://bun.sh/), новый быстрый JavaScript рантайм, для улучшения производительности серверной части.
- **Database**: Проект включает в себя использование [PostgreSQL](https://www.postgresql.org/) в сочетании с [Prisma](https://www.prisma.io/), которое обеспечивает удобный доступ к базе данных и управление данными.
- **Client**: Для фронтенда используется [React](https://reactjs.org/) в сочетании с [Material UI](https://mui.com/), что позволяет создавать современные и отзывчивые пользовательские интерфейсы.
