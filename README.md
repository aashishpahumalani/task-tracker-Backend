# Task Tracker Backend

A robust REST API for managing tasks built with Express.js, Prisma, and MySQL.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MySQL database credentials.

3. **Set up database:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## 📋 Features

- ✅ **CRUD Operations**: Create, read, update, and delete tasks
- ✅ **Task Completion**: Mark tasks as completed/not completed
- ✅ **Custom Colors**: Add custom hex colors to tasks
- ✅ **Input Validation**: Comprehensive validation and error handling
- ✅ **Clean Architecture**: Modular and maintainable code structure
- ✅ **CORS Support**: Ready for frontend integration
- ✅ **Security**: Helmet.js for security headers
- ✅ **Logging**: Morgan for HTTP request logging

## 🛠 Tech Stack

- **Backend**: Express.js
- **Database**: MySQL with Prisma ORM
- **Validation**: express-validator
- **Security**: Helmet.js, CORS
- **Development**: Nodemon for auto-reload


## 🏗 Project Structure

```
src/
├── app.js              # Main application entry point
├── config/
│   └── database.js     # Database configuration and connection
├── controllers/
│   └── taskController.js # Task business logic
├── middleware/
│   ├── errorHandler.js  # Global error handling
│   └── validation.js    # Input validation rules
└── routes/
    └── taskRoutes.js    # API route definitions
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion status |
| DELETE | `/api/tasks/:id` | Delete task |

## 📝 Example Usage

```bash
# Get all tasks
curl http://localhost:3001/api/tasks

# Create a new task
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express.js", "color": "#28a745"}'

# Update a task
curl -X PUT http://localhost:3001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 🔧 Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio