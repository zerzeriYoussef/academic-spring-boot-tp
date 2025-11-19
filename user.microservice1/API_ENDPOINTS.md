# User Microservice 1 - API Endpoints

## Base URL
- **Port**: 8083
- **Context Path**: `/users`
- **Base URL**: `http://localhost:8083/users`

## Prerequisites
- MySQL database running on `localhost:3306`
- Database will be created automatically: `users_db`
- JWT authentication is required for protected endpoints

---

## API Endpoints

### 1. Login (Authentication)
**Endpoint**: `POST /users/login`

**Description**: Authenticates a user and returns a JWT token in the `Authorization` header.

**Authentication**: Not required (public endpoint)

**Request Body** (JSON):
```json
{
  "username": "admin",
  "password": "123"
}
```

**Response**:
- **Status**: 200 OK
- **Headers**: 
  - `Authorization`: JWT token (use this token for subsequent requests)
- **Body**: Empty

**Example (Postman)**:
- Method: `POST`
- URL: `http://localhost:8083/users/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "username": "admin",
  "password": "123"
}
```

**Note**: After successful login, copy the `Authorization` header value and use it in subsequent requests.

---

### 2. Get All Users
**Endpoint**: `GET /users/all`

**Description**: Retrieves a list of all users in the system.

**Authentication**: Required (JWT token with ADMIN role)

**Request Headers**:
- `Authorization`: JWT token (obtained from login)

**Response**:
- **Status**: 200 OK
- **Body**: Array of User objects

**Example (Postman)**:
- Method: `GET`
- URL: `http://localhost:8083/users/all`
- Headers: 
  - `Authorization`: `<your-jwt-token>`
  - `Content-Type: application/json`

**Note**: This endpoint requires ADMIN authority. Make sure you login with a user that has ADMIN role.

---

## Testing Workflow

1. **Login** to get JWT token:
   - POST to `http://localhost:8083/users/login`
   - Copy the `Authorization` header value from response

2. **Use the token** for protected endpoints:
   - Add `Authorization` header with the token value
   - Make requests to protected endpoints like `/users/all`

---

## Default Users (if initialization code is enabled)

The following users are created when the `@PostConstruct` method in `Application.java` is uncommented:

- **admin** / **123** (roles: ADMIN, USER)
- **fadi** / **123** (role: USER)
- **yassine** / **123** (role: USER)

**Note**: Currently, the initialization code is commented out. You may need to uncomment it or create users manually.

---

## JWT Token Details

- **Expiration Time**: 10 days
- **Secret**: `fadinaffeti1@gmail.com`
- **Token Format**: Bearer token (use the value directly in Authorization header)

---

## CORS Configuration

- Allowed Origins: `http://localhost:4200`
- Allowed Methods: All
- Allowed Headers: All
- Exposed Headers: `Authorization`

