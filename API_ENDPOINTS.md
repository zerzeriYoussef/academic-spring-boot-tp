# Blog-Comment API Endpoints

This Spring Boot application provides a REST API for managing blogs and comments with a one-to-many relationship.

## Database Configuration
- Database: MySQL
- Database Name: `demo`
- Tables: `blogs`, `comments`

## Blog Endpoints

### Create Blog
```
POST /api/blogs
Content-Type: application/json

{
    "title": "My Blog Title",
    "content": "Blog content here...",
    "author": "Author Name"
}
```

### Get All Blogs
```
GET /api/blogs
```

### Get All Blogs with Comments
```
GET /api/blogs/with-comments
```

### Get Blog by ID
```
GET /api/blogs/{id}
```

### Get Blog by ID with Comments
```
GET /api/blogs/{id}/with-comments
```

### Update Blog
```
PUT /api/blogs/{id}
Content-Type: application/json

{
    "title": "Updated Title",
    "content": "Updated content...",
    "author": "Updated Author"
}
```

### Delete Blog
```
DELETE /api/blogs/{id}
```

### Get Blogs by Author
```
GET /api/blogs/author/{author}
```

### Search Blogs by Title
```
GET /api/blogs/search?keyword={keyword}
```

## Comment Endpoints

### Create Comment for Blog
```
POST /api/comments/blog/{blogId}
Content-Type: application/json

{
    "content": "Comment content here...",
    "author": "Commenter Name",
    "email": "commenter@example.com"
}
```

### Get All Comments
```
GET /api/comments
```

### Get Comment by ID
```
GET /api/comments/{id}
```

### Get Comments by Blog ID
```
GET /api/comments/blog/{blogId}
```

### Get Comments by Blog ID (Ordered by Date)
```
GET /api/comments/blog/{blogId}/ordered
```

### Update Comment
```
PUT /api/comments/{id}
Content-Type: application/json

{
    "content": "Updated comment...",
    "author": "Updated Author",
    "email": "updated@example.com"
}
```

### Delete Comment
```
DELETE /api/comments/{id}
```

### Get Comments by Author
```
GET /api/comments/author/{author}
```

### Get Comments by Email
```
GET /api/comments/email/{email}
```

### Count Comments by Blog ID
```
GET /api/comments/blog/{blogId}/count
```

## Example Usage

1. **Create a blog:**
```bash
curl -X POST http://localhost:8080/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog",
    "content": "This is my first blog post!",
    "author": "John Doe"
  }'
```

2. **Add a comment to the blog:**
```bash
curl -X POST http://localhost:8080/api/comments/blog/1 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great blog post!",
    "author": "Jane Smith",
    "email": "jane@example.com"
  }'
```

3. **Get blog with all comments:**
```bash
curl http://localhost:8080/api/blogs/1/with-comments
```

## Database Schema

### Blogs Table
- `id` (Primary Key, Auto Increment)
- `title` (VARCHAR(200), Not Null)
- `content` (TEXT, Not Null)
- `author` (VARCHAR(100))
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Comments Table
- `id` (Primary Key, Auto Increment)
- `content` (TEXT, Not Null)
- `author` (VARCHAR(100))
- `email` (VARCHAR(100))
- `blog_id` (Foreign Key to blogs.id, Not Null)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Running the Application

1. Make sure MySQL is running and create a database named `demo`
2. Update the database credentials in `application.properties` if needed
3. Run the application: `mvn spring-boot:run`
4. The API will be available at `http://localhost:8081`
