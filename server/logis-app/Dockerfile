FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
# Add wait-for-it script


# Update entrypoint to wait for Redis
ENTRYPOINT ["java", "-jar", "app.jar"]