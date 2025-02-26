# Real Time Game Test

## Technologies Used

### .NET 9

- The solution is targeting .NET 8, leveraging the latest features and improvements of the platform.

### ASP.NET Core

- Used to build the Web API.

### SignalR

- Used for a realtime server with Websocket technology

### Docker

- Configuration for Docker containers, facilitating deployment and execution of the application in isolated environments.
- Properties in .csproj: DockerDefaultTargetOS, DockerfileContext, DockerComposeProjectPath

## Architectural Approaches

### Domain Driven Design (DDD)

- The solution follows DDD principles, organizing the code around the application's domain (simplified).

### Clean Architecture

- The solution is structured to clearly separate responsibilities between layers, promoting maintainability and scalability.
- Layers:
- Domain: Contains entities, specifications, and validations.
- Infrastructure: Contains data access implementations and external services.
- WebApi: Contains controllers and API configuration.
- Used to separate read and write operations, improving clarity and performance.
- Used to encapsulate business rules in reusable specifications.

## Configuration and Dependencies

- Dependency Injection
- Use of Microsoft.Extensions.DependencyInjection to register and resolve dependencies.

## Configuration Files

- appsettings.json
- Contains application settings, such as database connections and RabbitMQ configurations.
- Program.cs
- Configures and initializes the application, registering services and middleware.

## Execute 

- run docker compose - f 'docker- compose.yml' up - d - - build
- ng serve
