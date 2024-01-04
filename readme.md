## Описание
Мой пример использования bun + react + typescript + prisma

## Установка

### Server
1. Установите bun:
    ```bash
    curl -fsSL https://bun.sh/install | bash
    ```

2. Установите зависимости сервера:
    ```bash
    npm install
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
    ```bash
    npm start
    ```

Откройте ваш браузер и перейдите по адресу `http://localhost:3000/` для просмотра вашего приложения.

## Дополнительная информация
Дополнительные сведения о проекте, настройках, и т.д.
