# 🍽️ E-Commerce Web Based Application

This project consists of:

- **Client** (React)
- **Spring Boot Backend Server**

---

## ✨ Features
- **User Authentication** (Sign in/up and log out)
- **View Available products**
- **Cart Management** (Manage the products that are added into the cart)
- **Order Placement & History**
- **Product Review System**
- **Live chat customer service**
---

## 🛠️ Prerequisites

Make sure the following are installed on your system:

- Node.js & npm
- Java 17+
- Maven
- Docker
- You are required to manually add products. Navigate to Admin and add item
---
## ⚙️ Example `application.yml` for Spring Boot

1. Add in server/logis-app/src/main/resources, Update the datasource.
```bash
    spring:
        application:
            name: logis_app

        datasource:
            url: jdbc:mysql://db:3306/logis
            username: root
            password: ADD_YOUR_PASSWORD
            driver-class-name: com.mysql.cj.jdbc.Driver

        redis:
            host: ${SPRING_REDIS_HOST:localhost}
            port: 6379

        mybatis:
        configuration:
            log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
            map-underscore-to-camel-case: true

        logging:
        level:
            com.zaxxer.hikari: DEBUG
            org.springframework.jdbc: DEBUG
```


2. Update the db/environment same with the application.yml if using docker in docker-compose.yml.
    ```bash
        server:
         environment:
            SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/logis
            SPRING_DATASOURCE_USERNAME: root
            SPRING_DATASOURCE_PASSWORD: ADD_YOUR_PASSSWORD

        db:
         environment:
            MYSQL_ROOT_PASSWORD: ADD_YOUR_PASSWORD
            MYSQL_DATABASE: logis
    ```

## 🔌 Option 1 : Running with docker 
1. Get jar file for Spring Boot
   ```bash
    cd server
    cd logis-app
    mvn clean install
   ```

2.  In the logis folder, run the command :
    ```bash
    docker compose build
    docker compose up
    ```

## 📱 Option 2 : Running the Application without docker

1. Navigate to the client/logis-app directory:

   ```bash
   cd client
   cd logis-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Navigate to axios instance and change the baseURL to the backend API.

   ```bash
   baseURL = `url`
   ```

4. Run the app on your client application:

   ```bash
   npm run dev
   ```

---

## ☕ Running the Spring Boot Server

1. Navigate to the server directory:

   ```bash
   cd server/logis-app
   ```

3. Run the server using Maven:

   ```bash
   mvn spring-boot:run
   ```

---

## Running the Redis Server in port 6379

1. Paste the command in docker terminal.
    ```bash
    docker run -d --name redis-server -p 6379:6379 redis
    ```

## Create table in MySQL
1.  Paste the file in db-init in directory into MySQL.




