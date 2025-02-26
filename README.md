# Real Time Game Test

## Technologies Used

### .NET 9

- The solution is targeting .NET 8, leveraging the latest features and improvements of the platform.

### ASP.NET Core

- Used to build the Web API.

### Entity Framework Core

- Used for data access and object-relational mapping (ORM).
- Package: Microsoft.EntityFrameworkCore.Design

### MediatR

- Used to implement the Mediator pattern, facilitating decoupled communication between components.
- Package: MediatR


### Docker

- Configuration for Docker containers, facilitating deployment and execution of the application in isolated environments.
- Properties in .csproj: DockerDefaultTargetOS, DockerfileContext, DockerComposeProjectPath

## Architectural Approaches

### Domain- Driven Design (DDD)

- The solution follows DDD principles, organizing the code around the application's domain.
- Example: Ambev.DeveloperEvaluation.Domain.Entities, Ambev.DeveloperEvaluation.Domain.Specifications

### Clean Architecture

- The solution is structured to clearly separate responsibilities between layers, promoting maintainability and scalability.
- Layers:
- Domain: Contains entities, specifications, and validations.
- Application: Contains use cases and application logic.
- Infrastructure: Contains data access implementations and external services.
- WebApi: Contains controllers and API configuration.
- CQRS (Command Query Responsibility Segregation)
- Used to separate read and write operations, improving clarity and performance.
- Example: CreateSaleCommand, GetSaleQuery
- Specification Pattern
- Used to encapsulate business rules in reusable specifications.
- Example: IDiscountSpecification, FourItemsPlusDiscountSpecification
- Validation
- Use of FluentValidation to validate commands and entities.
- Example: CreateSaleValidator, SaleItemValidator

## Configuration and Dependencies

- Dependency Injection
- Use of Microsoft.Extensions.DependencyInjection to register and resolve dependencies.
- Example: builder.Services.AddMediatR(...), builder.Services.AddDbContext<DefaultContext>(...)
- AutoMapper
- Used to map objects between different layers.
- Example: builder.Services.AddAutoMapper(...)

## Folder Structure

- Features

- Contains specific functionalities organized by context.

- Example: Features\Sales\CreateSale, Features\Users\GetUser
- Common
- Contains common components and utilities used throughout the application.
- Example: Common\Validation, Common\Logging
- IoC
- Contains dependency injection configuration.
- Example: Ambev.DeveloperEvaluation.IoC

## Configuration Files

- appsettings.json
- Contains application settings, such as database connections and RabbitMQ configurations.
- Program.cs
- Configures and initializes the application, registering services and middleware.

## Execute

- run docker compose - f 'docker- compose.yml' up - d - - build

## Links

### Swagger UI: https://localhost:7181/swagger/index.html
- ![Sagger UI](https://raw.githubusercontent.com/vagnerbezerraf/test-ambev/refs/heads/main/docs/Swagger_Sales_1.png)
  
### RabbitMQ Panel: http://localhost:15672/#/ 
- ![RabbitMQ Panel](https://raw.githubusercontent.com/vagnerbezerraf/test-ambev/refs/heads/main/docs/Rabbit_Doc_1.png)

### PgAdmin UI: http://localhost:16543/browser/
- ![PgAdmin UI](https://raw.githubusercontent.com/vagnerbezerraf/test-ambev/refs/heads/main/docs/PgAdmin_1.png)
