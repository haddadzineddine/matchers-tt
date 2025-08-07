# MATCHERS-TT API

A NestJS-based REST API for managing companies, contacts, and formations with JWT authentication and resource ownership protection.

## 🚀 Features

- **JWT Authentication** - Secure login system with JWT tokens
- **Company Management** - Create and manage companies with SIRET validation
- **Contact Management** - User registration and contact management
- **Formation Management** - Training/course management system
- **Resource Ownership** - Custom guards to ensure users can only access their own resources
- **API Documentation** - Swagger/OpenAPI documentation
- **Input Validation** - Comprehensive DTO validation with class-validator
- **SQLite Database** - Lightweight database with TypeORM

## 🛠️ Tech Stack

- **Framework**: NestJS 11.x
- **Database**: SQLite with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd matchers-tt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   DB_NAME=db.sqlite
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=1h
   ```

4. **Start the application**

   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

5. **Access the application**
   - API: <http://localhost:3000>
   - Swagger Documentation: <http://localhost:3000/api>

## 📚 API Documentation

### Authentication Endpoints

#### POST /auth/login

Login with email and password to receive a JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "strongPassword123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "companyName": "Acme Corp",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Status Codes:**

- `200` - Login successful
- `401` - Invalid credentials

---

### Company Endpoints

#### POST /company

Create a new company.

**Request Body:**

```json
{
  "name": "Acme Corporation",
  "siret": "12345678901234",
  "address": "123 Main Street, Paris, France"
}
```

**Validation Rules:**

- `name`: Minimum 3 characters
- `siret`: Exactly 14 digits
- `address`: Minimum 3 characters

**Response:**

```json
{
  "uuid": "company-uuid",
  "name": "Acme Corporation",
  "siret": "12345678901234",
  "address": "123 Main Street, Paris, France",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Status Codes:**

- `201` - Company created successfully
- `400` - Invalid input data

#### GET /company

Get all companies (requires authentication).

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
[
  {
    "uuid": "company-uuid",
    "name": "Acme Corporation",
    "siret": "12345678901234",
    "address": "123 Main Street, Paris, France",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Status Codes:**

- `200` - Success
- `401` - Unauthorized (missing or invalid JWT token)

---

### Contact Endpoints

#### POST /contact

Create a new contact (user registration).

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "companyId": "company-uuid"
}
```

**Validation Rules:**

- `firstName`: Required, non-empty string
- `lastName`: Required, non-empty string
- `email`: Valid email format
- `password`: Required, non-empty string (will be hashed)
- `companyId`: Required, valid UUID

**Response:**

```json
{
  "uuid": "contact-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "company": {
    "uuid": "company-uuid",
    "name": "Acme Corporation"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Status Codes:**

- `201` - Contact created successfully
- `400` - Invalid input or contact already exists

#### GET /contact

Get all contacts.

**Response:**

```json
[
  {
    "uuid": "contact-uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "company": {
      "uuid": "company-uuid",
      "name": "Acme Corporation"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Status Codes:**

- `200` - Success

#### GET /contact/:uuid

Get a specific contact by UUID (requires authentication and resource ownership).

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Parameters:**

- `uuid`: Contact UUID (must match authenticated user's ID)

**Status Codes:**

- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (trying to access another user's contact)

---

### Formation Endpoints

#### POST /formation

Create a new formation.

**Request Body:**

```json
{
  "name": "React Developer Bootcamp",
  "contactId": "contact-uuid",
  "companyId": "company-uuid"
}
```

**Validation Rules:**

- `name`: Required, non-empty string
- `contactId`: Required, valid UUID
- `companyId`: Required, valid UUID

**Response:**

```json
{
  "uuid": "formation-uuid",
  "name": "React Developer Bootcamp",
  "contact": {
    "uuid": "contact-uuid",
    "firstName": "John",
    "lastName": "Doe"
  },
  "company": {
    "uuid": "company-uuid",
    "name": "Acme Corporation"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Status Codes:**

- `201` - Formation created successfully
- `400` - Invalid input or referenced entities not found

#### GET /formation

Get all formations.

**Response:**

```json
[
  {
    "uuid": "formation-uuid",
    "name": "React Developer Bootcamp",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Status Codes:**

- `200` - Success

#### GET /formation/contact/:uuid

Get all formations for a specific contact (requires authentication and resource ownership).

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Parameters:**

- `uuid`: Contact UUID (must match authenticated user's ID)

**Response:**

```json
[
  {
    "uuid": "formation-uuid",
    "name": "React Developer Bootcamp",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Status Codes:**

- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (trying to access another user's formations)

---

## 🔐 Authentication & Authorization

### JWT Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, you'll receive an access token that must be included in the `Authorization` header for protected endpoints.

**Header Format:**

```
Authorization: Bearer <your-jwt-token>
```

### Resource Ownership Protection

The API implements a custom `ResourceOwnerGuard` that ensures users can only access their own resources. This guard:

- Validates that the authenticated user's ID matches the resource parameter in the URL
- Prevents users from accessing other users' contacts and formations
- Provides customizable error messages for different endpoints

### Protected Endpoints

- `GET /company` - Requires authentication
- `GET /contact/:uuid` - Requires authentication + resource ownership
- `GET /formation/contact/:uuid` - Requires authentication + resource ownership

## 🗄️ Database Schema

### Company Entity

```typescript
{
  uuid: string (Primary Key)
  name: string
  siret: string (14 digits)
  address: string
  contacts: ContactEntity[] (One-to-Many)
  formations: FormationEntity[] (One-to-Many)
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null (Soft Delete)
}
```

### Contact Entity

```typescript
{
  uuid: string (Primary Key)
  firstName: string
  lastName: string
  email: string (Unique per company)
  password: string (Hashed with bcrypt)
  company: CompanyEntity (Many-to-One)
  formations: FormationEntity[] (One-to-Many)
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null (Soft Delete)
}
```

### Formation Entity

```typescript
{
  uuid: string (Primary Key)
  name: string
  company: CompanyEntity (Many-to-One)
  contact: ContactEntity (Many-to-One)
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null (Soft Delete)
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🔧 Development Scripts

```bash
# Start in development mode with hot reload
npm run start:dev

# Start in debug mode
npm run start:debug

# Build the application
npm run build

# Start production build
npm run start:prod

# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint
```

## 📁 Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── dto/               # Data Transfer Objects
│   ├── guards/            # JWT Auth Guard
│   ├── strategy/          # JWT Strategy
│   └── auth.service.ts    # Authentication logic
├── company/               # Company management module
│   ├── dto/               # Company DTOs
│   ├── entities/          # Company entity
│   └── company.service.ts # Company business logic
├── contact/               # Contact management module
│   ├── dto/               # Contact DTOs
│   ├── entities/          # Contact entity
│   └── contact.service.ts # Contact business logic
├── formation/             # Formation management module
│   ├── dto/               # Formation DTOs
│   ├── entities/          # Formation entity
│   └── formation.service.ts # Formation business logic
├── configs/               # Configuration files
│   ├── configuration.ts   # Environment config
│   ├── database.config.ts # Database config
│   ├── jwt.config.ts      # JWT config
│   └── swagger.config.ts  # API documentation config
├── shared/                # Shared utilities
│   ├── decorators/        # Custom decorators
│   ├── guards/            # Custom guards
│   ├── constants.ts       # Application constants
│   └── types.ts           # TypeScript types
└── main.ts                # Application entry point
```

## 🌟 Key Features Explained

### Custom Resource Owner Guard

The application implements a sophisticated authorization system that goes beyond simple authentication:

- **Resource Ownership Validation**: Ensures users can only access resources they own
- **Flexible Configuration**: Customizable parameter names and error messages
- **Decorator-Based**: Easy to apply to any endpoint with `@ResourceOwner()`

### Password Security

- Passwords are hashed using bcrypt with salt rounds
- Plain text passwords are never stored in the database
- Secure comparison during login process

### Input Validation

- Comprehensive DTO validation using class-validator
- SIRET number format validation (exactly 14 digits)
- Email format validation
- Required field validation with meaningful error messages

### Soft Delete Support

All entities support soft deletion, meaning records are marked as deleted rather than permanently removed from the database.

## 🚨 Error Handling

The API provides consistent error responses with appropriate HTTP status codes:

- `400 Bad Request` - Invalid input data or business logic violations
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Resource access denied (ownership violation)
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists

## 🔄 API Workflow Examples

### Complete User Registration and Login Flow

1. **Create a Company**

   ```bash
   POST /company
   {
     "name": "Tech Solutions Inc",
     "siret": "12345678901234",
     "address": "456 Innovation Drive, Lyon, France"
   }
   ```

2. **Register a Contact**

   ```bash
   POST /contact
   {
     "firstName": "Alice",
     "lastName": "Smith",
     "email": "alice@techsolutions.com",
     "password": "securePassword123",
     "companyId": "company-uuid-from-step-1"
   }
   ```

3. **Login**

   ```bash
   POST /auth/login
   {
     "email": "alice@techsolutions.com",
     "password": "securePassword123"
   }
   ```

4. **Create a Formation**

   ```bash
   POST /formation
   {
     "name": "Advanced JavaScript Training",
     "contactId": "contact-uuid-from-step-2",
     "companyId": "company-uuid-from-step-1"
   }
   ```

5. **Access User's Formations**

   ```bash
   GET /formation/contact/contact-uuid-from-step-2
   Headers: Authorization: Bearer jwt-token-from-step-3
   ```

## 📝 License

This project is licensed under the UNLICENSED license.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please create an issue in the repository.

---

**Happy coding! 🚀**
