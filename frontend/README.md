# Task Manager Frontend

React frontend for the Django REST Framework Task Manager API.

## Tech Stack

- React with Vite
- React Router DOM
- Axios
- JWT authentication with SimpleJWT
- Plain responsive CSS

## API Endpoints Used

The frontend expects the backend API at `http://localhost:8000/api`.

- `POST /api/register/`
- `POST /api/login/`
- `POST /api/refresh/`
- `GET /api/tasks/`
- `POST /api/tasks/`
- `PATCH /api/tasks/:id/`
- `DELETE /api/tasks/:id/`

To override the API URL, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Run the Project

From the project root, start the backend:

```bash
cd backend
python manage.py runserver
```

In a second terminal, start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Frontend Structure

```text
src/
  api/
    auth.js
    client.js
    tasks.js
  components/
    Navbar.jsx
    TaskCard.jsx
    TaskForm.jsx
    TaskList.jsx
  context/
    AuthContext.jsx
  pages/
    Dashboard.jsx
    Login.jsx
    Register.jsx
  routes/
    ProtectedRoute.jsx
  styles/
    app.css
  utils/
    apiError.js
    tokenStorage.js
  App.jsx
  index.css
  main.jsx
```

## Features

- User registration and login
- Access and refresh token storage
- Authorization header interceptor
- Automatic token refresh on expired access tokens
- Protected dashboard route
- Task create, read, update, delete
- Completed/pending toggle
- All, Completed, and Pending filters
- Loading and error states
- Responsive dashboard UI
