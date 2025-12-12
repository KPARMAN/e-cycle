# E-Cycle Frontend-Backend Integration Guide

## Overview

Your frontend is now connected to your backend API running on `http://localhost:4000`. This document explains how to use the integrated services.

## Setup

### 1. Environment Variables

The `.env.local` file is configured with:

```
VITE_API_URL=http://localhost:4000
```

If your backend runs on a different URL, update this value.

### 2. Start Backend

Ensure your backend is running:

```bash
npm run dev  # or your backend start command
```

### 3. Verify Connection

Test the health endpoint:

```bash
curl http://localhost:4000/api/health
```

## API Services

### Authentication Service (`client/lib/services/auth.js`)

#### Register User

```javascript
import authService from "@/lib/services/auth.js";

try {
  const result = await authService.register({
    name: "John Doe",
    email: "john@example.com",
    password: "securePassword123",
  });

  console.log(result.user);
  console.log(result.token);
} catch (error) {
  console.error(error.message);
}
```

#### Login User

```javascript
try {
  const result = await authService.login({
    email: "john@example.com",
    password: "securePassword123",
  });

  console.log(result.user);
} catch (error) {
  console.error(error.message);
}
```

#### Get Current User

```javascript
const user = authService.getUser();
const token = authService.getToken();
const isAuth = authService.isAuthenticated();
```

#### Logout

```javascript
authService.logout();
```

### Upload Service (`client/lib/services/upload.js`)

```javascript
import uploadService from "@/lib/services/upload.js";

try {
  const response = await uploadService.uploadImage(file);
  console.log(response.url); // Cloudinary URL
  console.log(response.public_id);
} catch (error) {
  console.error(error.message);
}
```

### Health Service (`client/lib/services/health.js`)

```javascript
import healthService from "@/lib/services/health.js";

try {
  const health = await healthService.checkHealth();
  console.log(health);
} catch (error) {
  console.error(error.message);
}
```

### API Client (`client/lib/api.js`)

For custom endpoints:

```javascript
import ApiClient from "@/lib/api.js";

// GET request
const data = await ApiClient.get("/api/endpoint");

// POST request
const result = await ApiClient.post("/api/endpoint", {
  key: "value",
});

// PUT request
await ApiClient.put("/api/endpoint", {
  key: "newValue",
});

// DELETE request
await ApiClient.delete("/api/endpoint");
```

## Using in React Components

### Example: Login Page

The Login and Signup pages are already integrated. They:

- Validate form input
- Call `authService.login()` or `authService.register()`
- Store JWT token and user info in localStorage
- Show success/error toast notifications
- Navigate to dashboard on success

### Example: Using useAuth Hook

```javascript
import useAuth from "@/hooks/useAuth.js";

export function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Example: File Upload

```javascript
import { useState } from "react";
import uploadService from "@/lib/services/upload.js";
import { toast } from "sonner";

export function ImageUpload() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const result = await uploadService.uploadImage(file);
      toast.success("Image uploaded successfully!");
      console.log(result.url);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      disabled={isLoading}
    />
  );
}
```

## Authentication Flow

1. User fills login/signup form
2. Form validates locally
3. Request sent to backend with email/password
4. Backend returns JWT token + user data
5. Token stored in localStorage (automatically by authService)
6. User is redirected to dashboard
7. All future requests include the token in Authorization header

## Error Handling

Services throw errors with descriptive messages:

```javascript
try {
  await authService.login(credentials);
} catch (error) {
  // Error messages from backend or network errors
  console.error(error.message);
  // Example: "Invalid credentials" or "Network request failed"
}
```

Use `sonner` toast for user-friendly error displays (already imported in Login/Signup).

## Protected Requests

The API client automatically includes the JWT token in the Authorization header for all authenticated requests. You can use protected endpoints like this:

```javascript
const data = await ApiClient.get("/api/protected-endpoint");
// Automatically includes: Authorization: Bearer <token>
```

## Testing

### Manual Testing

1. Visit `http://localhost:3000/auth/signup`
2. Register with test credentials
3. You should see a success message and be redirected to dashboard
4. Check localStorage for `auth_token` and `user`

### Testing with Postman

Use the endpoints from your ENDPOINTS.md:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/upload`

### Backend Health Check

```bash
curl http://localhost:4000/api/health
```

## Pages Already Integrated

✅ **Login** (`client/pages/Login.jsx`)

- Calls `authService.login()`
- Shows loading state
- Error handling with toast
- Stores token and user

✅ **Signup** (`client/pages/Signup.jsx`)

- Calls `authService.register()`
- Shows loading state
- Error handling with toast
- Stores token and user

## Next Steps

To integrate more features:

1. **Add Listings**: Create service in `client/lib/services/listings.js`
2. **Chat**: Create service in `client/lib/services/chat.js`
3. **Profile**: Create service in `client/lib/services/profile.js`
4. **Protected Routes**: Use `useAuth` hook to check authentication

Example service template:

```javascript
import ApiClient from "../api.js";

export const myService = {
  async getItems() {
    return ApiClient.get("/api/items");
  },

  async createItem(data) {
    return ApiClient.post("/api/items", data);
  },

  async updateItem(id, data) {
    return ApiClient.put(`/api/items/${id}`, data);
  },

  async deleteItem(id) {
    return ApiClient.delete(`/api/items/${id}`);
  },
};
```

## Common Issues

### "Backend is not available"

- Check if backend is running on `http://localhost:4000`
- Verify `VITE_API_URL` in `.env.local`

### "Invalid credentials"

- User doesn't exist
- Email/password are incorrect

### CORS Errors

- Ensure backend has CORS enabled
- Check `FRONTEND_URL` environment variable on backend

### Token Expired

- Token is stored in localStorage
- Implement token refresh logic if needed
- For now, user needs to login again

## Support

Refer to your backend ENDPOINTS.md for:

- Complete endpoint list
- Request/response formats
- Authentication requirements
- Error codes
