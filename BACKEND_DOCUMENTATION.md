# E-Cycle Backend Documentation

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** Production-Ready Design

---

## Table of Contents

1. [Project Summary](#project-summary)
2. [Backend Technology Recommendation](#backend-technology-recommendation)
3. [Database Design (Full Schema)](#database-design-full-schema)
4. [API Route Documentation](#api-route-documentation)
5. [Authentication & Authorization Flow](#authentication--authorization-flow)
6. [Backend Folder Structure](#backend-folder-structure)
7. [Business Logic Requirements](#business-logic-requirements)
8. [Integration With Frontend](#integration-with-frontend)
9. [Real-Time Messaging with Socket.io](#real-time-messaging-with-socketio)
10. [Error Handling & Edge Cases](#error-handling--edge-cases)
11. [Deployment Guide](#deployment-guide)

---

## Project Summary

### Project Overview

**E-Cycle** is a marketplace platform for e-waste management that connects:

- **Sellers/Technicians**: Users who have electronic waste to sell
- **Recyclers**: Users/organizations who buy and process e-waste
- **Admins**: Platform administrators managing users, categories, and content moderation

### Purpose

E-Cycle streamlines the e-waste management process by providing:

1. A searchable marketplace for e-waste listings
2. Real-time messaging between sellers and recyclers
3. Inventory management for sellers
4. User profiles with ratings and reviews
5. Notification system for updates and alerts
6. Admin dashboard for platform management

### Key Features

- **User Management**: Registration, login, role-based access (Seller, Recycler, Admin)
- **Listings**: Create, read, update, delete e-waste listings with images
- **Inventory**: Track e-waste stock with quantities and conditions
- **Messaging**: Real-time chat between buyers and sellers
- **Notifications**: Email and in-app notifications for messages, new listings, and alerts
- **Profile Management**: User profile, rating system, and preferences
- **Settings**: User preferences for notifications, privacy, and security
- **Admin Dashboard**: Manage users, listings, categories, and platform analytics

### User Workflows

**Seller Workflow:**

1. Sign up → Choose "Seller" role
2. Complete profile (company info, location)
3. Add inventory items → Create listings
4. Receive messages from recyclers
5. Track listings and engagement metrics
6. Manage account settings

**Recycler Workflow:**

1. Sign up → Choose "Recycler" role
2. Complete profile
3. Browse active listings
4. Message sellers for details/negotiation
5. Track conversations and interests
6. Manage preferences and notifications

**Admin Workflow:**

1. Admin access (created via CLI or special signup)
2. View all users, listings, and platform metrics
3. Manage categories and listing approval
4. Handle user disputes and moderation
5. Generate reports and analytics

---

## Backend Technology Recommendation

### Tech Stack Architecture

```
Frontend Layer:
└─ React 18 (Vite) + React Router + TailwindCSS

Backend Layer:
└─ Node.js + Express.js (HTTP REST API)
   ├─ Socket.io (Real-time messaging)
   └─ Middleware: JWT Auth, CORS, Error Handling

Data Layer:
├─ MongoDB (Primary database)
├─ Redis (Optional - for sessions/caching)
└─ File Storage: Cloudinary (Images)

External Services:
├─ SendGrid (Email notifications)
└─ Cloudinary (Image upload & optimization)

Hosting:
└─ Render.com / Railway.app / Heroku (Backend deployment)
```

### Why This Stack?

| Component         | Choice     | Rationale                                                                                                         |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| **Runtime**       | Node.js    | Fast, non-blocking I/O; JavaScript on frontend and backend; easy real-time with Socket.io                         |
| **Framework**     | Express.js | Lightweight, flexible, beginner-friendly, industry standard for REST APIs                                         |
| **Database**      | MongoDB    | Flexible schema (perfect for marketplace items with varied attributes); document-based matches JSON API responses |
| **Real-Time**     | Socket.io  | Industry standard for real-time messaging; works seamlessly with Node.js; fallback to polling if needed           |
| **Image Storage** | Cloudinary | Free tier, automatic optimization, CDN delivery, easy Node.js SDK                                                 |
| **Email Service** | SendGrid   | Simple API, free tier with 100 emails/day, reliable delivery                                                      |

### Architecture Diagram

```
┌─────────────────────────────────────────┐
│      React Frontend (Vite)              │
│  (Dashboard, Listings, Messages, etc)   │
└──────────────┬──────────────────────────┘
               │
        HTTP + WebSocket
               │
┌──────────────▼──────────────────────────┐
│    Express.js Backend (Port 5000)       │
├──────────────────────────────────────────┤
│ Routes:                                  │
│  /api/auth (Login, Register)            │
│  /api/users (Profile management)        │
│  /api/listings (CRUD operations)        │
│  /api/inventory (Stock management)      │
│  /api/messages (Chat history)           │
│  /api/notifications (Preferences)       │
│  /api/settings (User settings)          │
│  /api/admin (Admin operations)          │
│  /api/upload (Image upload)             │
├──────────────────────────────────────────┤
│ Socket.io Namespaces:                    │
│  /socket/messages (Real-time chat)      │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│ MongoDB│ │SendGrid│ │Cloudinary│
│ (Data) │ │(Email) │ │(Images) │
└────────┘ └────────┘ └────────┘
```

---

## Database Design (Full Schema)

### MongoDB Collections Overview

```
Collections:
├── users (authentication & profiles)
├── listings (e-waste items for sale)
├── inventory (seller's stock)
├── messages (chat messages)
├── conversations (chat threads)
├── notifications (user notifications)
├── settings (user preferences)
├── categories (e-waste categories)
├── ratings (user reviews)
└── admin_logs (audit trail)
```

### 1. Users Collection

**Purpose:** Store user accounts, authentication data, and profile information

```javascript
{
  _id: ObjectId,

  // Authentication
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  phone: String,

  // Profile Information
  firstName: String,
  lastName: String,
  company: String,
  bio: String,
  profileImage: String (Cloudinary URL),
  location: String,
  country: String,
  city: String,

  // Role & Permissions
  role: String (enum: ["seller", "recycler", "admin"]),

  // User Status
  status: String (enum: ["active", "suspended", "deleted"]),
  isEmailVerified: Boolean,
  isTwoFactorEnabled: Boolean,
  twoFactorSecret: String (encrypted if enabled),

  // Rating System (for sellers)
  rating: {
    average: Number (0-5),
    count: Number,
    totalReviews: Number
  },

  // Account Activity
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date,

  // Soft delete
  deletedAt: Date (null if active)
}
```

**Indexes:**

```javascript
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ status: 1 });
db.users.createIndex({ createdAt: -1 });
```

---

### 2. Listings Collection

**Purpose:** Store e-waste items for sale

```javascript
{
  _id: ObjectId,

  // Basic Information
  title: String,
  description: String,
  category: ObjectId (reference to categories),

  // Seller Information
  sellerId: ObjectId (reference to users),
  sellerName: String (denormalized for quick access),
  sellerCompany: String,

  // Pricing & Quantity
  price: Number,
  quantity: Number,
  unit: String (enum: ["kg", "pieces", "boxes", "tons"]),
  condition: String (enum: ["like-new", "excellent", "good", "fair", "poor"]),

  // Media
  images: [String] (array of Cloudinary URLs),

  // Location & Logistics
  location: String,
  city: String,
  country: String,
  pickupAvailable: Boolean,
  deliveryAvailable: Boolean,

  // Listing Status
  status: String (enum: ["active", "sold", "expired", "draft"]),
  expiresAt: Date,

  // Engagement Metrics
  views: Number,
  favorites: [ObjectId] (array of user IDs),

  // Timestamps
  createdAt: Date,
  updatedAt: Date,

  // SEO & Search
  tags: [String]
}
```

**Indexes:**

```javascript
db.listings.createIndex({ sellerId: 1 });
db.listings.createIndex({ status: 1 });
db.listings.createIndex({ category: 1 });
db.listings.createIndex({ createdAt: -1 });
db.listings.createIndex({ title: "text", description: "text" });
db.listings.createIndex({ location: 1, status: 1 });
```

---

### 3. Inventory Collection

**Purpose:** Track seller's e-waste stock

```javascript
{
  _id: ObjectId,

  // Reference to seller
  sellerId: ObjectId (reference to users),

  // Item Details
  itemName: String,
  category: ObjectId (reference to categories),
  sku: String (unique per seller),

  // Stock Information
  quantity: Number,
  unit: String (enum: ["kg", "pieces", "boxes"]),
  condition: String,
  value: Number (estimated value per unit),

  // Metadata
  lastUpdated: Date,
  createdAt: Date,

  // Linked Listing (if any)
  activeListingId: ObjectId (reference to listings, null if not listed)
}
```

**Indexes:**

```javascript
db.inventory.createIndex({ sellerId: 1 });
db.inventory.createIndex({ sku: 1, sellerId: 1 }, { unique: true });
db.inventory.createIndex({ category: 1 });
```

---

### 4. Conversations Collection

**Purpose:** Track chat threads between users

```javascript
{
  _id: ObjectId,

  // Participants
  participants: [
    {
      userId: ObjectId,
      userName: String (denormalized),
      userImage: String,
      lastReadAt: Date
    }
  ],

  // Related Listing (optional)
  listingId: ObjectId (reference to listings, null for direct messaging),
  listingTitle: String,

  // Conversation Status
  status: String (enum: ["active", "archived", "closed"]),

  // Message Count (for optimization)
  messageCount: Number,
  lastMessage: {
    text: String,
    senderId: ObjectId,
    sentAt: Date
  },

  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

```javascript
db.conversations.createIndex({ participants.userId: 1 })
db.conversations.createIndex({ listingId: 1 })
db.conversations.createIndex({ updatedAt: -1 })
```

---

### 5. Messages Collection

**Purpose:** Store individual chat messages

```javascript
{
  _id: ObjectId,

  // Reference to Conversation
  conversationId: ObjectId (reference to conversations),

  // Message Content
  senderId: ObjectId (reference to users),
  senderName: String (denormalized),
  text: String,

  // Message Status
  isRead: Boolean,
  readAt: Date,

  // Attachments (optional)
  attachments: [
    {
      type: String (enum: ["image", "file"]),
      url: String (Cloudinary URL),
      fileName: String
    }
  ],

  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

```javascript
db.messages.createIndex({ conversationId: 1, createdAt: 1 });
db.messages.createIndex({ senderId: 1 });
db.messages.createIndex({ isRead: 1 });
```

---

### 6. Notifications Collection

**Purpose:** Store user notifications

```javascript
{
  _id: ObjectId,

  // Recipient
  userId: ObjectId (reference to users),

  // Notification Content
  type: String (enum: ["message", "listing_alert", "rating", "marketing", "system"]),
  title: String,
  message: String,

  // Related Entity
  relatedId: ObjectId (reference to listings, conversations, or null),
  relatedType: String (enum: ["listing", "conversation", "user"]),

  // Status
  isRead: Boolean,
  readAt: Date,

  // Delivery Channels
  deliveredVia: [String] (enum: ["email", "in_app"]),
  emailSent: Boolean,
  emailSentAt: Date,

  // Timestamps
  createdAt: Date,
  expiresAt: Date
}
```

**Indexes:**

```javascript
db.notifications.createIndex({ userId: 1, createdAt: -1 });
db.notifications.createIndex({ isRead: 1 });
db.notifications.createIndex({ type: 1 });
db.notifications.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

---

### 7. Settings Collection

**Purpose:** Store user preferences and settings

```javascript
{
  _id: ObjectId,

  // User Reference
  userId: ObjectId (reference to users, unique),

  // Notification Preferences
  notifications: {
    email: Boolean,
    sms: Boolean,
    marketingEmails: Boolean,
    newListingAlerts: Boolean,
    messageNotifications: Boolean,
    push: Boolean
  },

  // Privacy & Security
  twoFactorAuth: Boolean,
  privateProfile: Boolean,
    showEmail: Boolean,

  // Email Preferences
  emailFrequency: String (enum: ["instant", "daily", "weekly", "never"]),

  // Theme & Preferences
  theme: String (enum: ["light", "dark", "auto"]),
  language: String (default: "en"),

  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

```javascript
db.settings.createIndex({ userId: 1 }, { unique: true });
```

---

### 8. Categories Collection

**Purpose:** E-waste categories/types

```javascript
{
  _id: ObjectId,

  // Category Information
  name: String,
  slug: String (unique, for URLs),
  description: String,
  icon: String (Cloudinary URL),

  // Hierarchy
  parentCategoryId: ObjectId (null for top-level categories),

  // Metadata
  isActive: Boolean,
  displayOrder: Number,

  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Example Categories:**

- Electronics (parent)
  - Laptops & Computers (child)
  - Mobile Devices (child)
  - Office Equipment (child)
  - Peripherals (child)
- Computer Parts
- Displays
- Cables & Accessories

**Indexes:**

```javascript
db.categories.createIndex({ slug: 1 }, { unique: true });
db.categories.createIndex({ parentCategoryId: 1 });
db.categories.createIndex({ isActive: 1 });
```

---

### 9. Ratings Collection

**Purpose:** Store user reviews and ratings

```javascript
{
  _id: ObjectId,

  // Rating Information
  fromUserId: ObjectId (reviewer),
  toUserId: ObjectId (reviewed user),

  // Related Transaction
  listingId: ObjectId,
  conversationId: ObjectId,

  // Rating Details
  rating: Number (1-5),
  title: String,
  comment: String,

  // Status
  isVisible: Boolean,
  isReported: Boolean,

  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**

```javascript
db.ratings.createIndex({ toUserId: 1 });
db.ratings.createIndex({ fromUserId: 1 });
db.ratings.createIndex({ listingId: 1 });
db.ratings.createIndex({ isVisible: 1 });
```

---

### 10. Admin Logs Collection

**Purpose:** Audit trail for admin actions

```javascript
{
  _id: ObjectId,

  // Admin Information
  adminId: ObjectId (reference to users),
  adminEmail: String,

  // Action Details
  action: String (enum: ["user_suspended", "listing_removed", "category_created", "user_deleted"]),
  entityType: String (enum: ["user", "listing", "category"]),
  entityId: ObjectId,

  // Changes
  changes: {
    fieldName: {
      before: Any,
      after: Any
    }
  },

  // Metadata
  reason: String,
  ipAddress: String,

  // Timestamp
  createdAt: Date
}
```

**Indexes:**

```javascript
db.admin_logs.createIndex({ adminId: 1, createdAt: -1 });
db.admin_logs.createIndex({ action: 1 });
db.admin_logs.createIndex({ createdAt: -1 });
```

---

### Database Relationships Diagram

```
users (1) ─────────── (many) listings
   │
   ├─ (1) ─────────── (many) inventory
   │
   ├─ (many) ────────── (many) conversations
   │
   ├─ (many) ────────── (many) messages
   │
   ├─ (1) ─────────── (1) settings
   │
   ├─ (many) ────────── (many) notifications
   │
   └─ (many) ────────── (many) ratings

listings (1) ─────────── (many) conversations
   │
   └─ (many) ────────── (many) messages

categories (1) ─────────── (many) listings
   │
   └─ (many) ────────── (many) inventory
```

---

## API Route Documentation

### API Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication Header Format

```
Authorization: Bearer <JWT_TOKEN>
```

---

### 1. Authentication Endpoints

#### POST `/auth/register`

**Description:** Create a new user account

**Request Body:**

```json
{
  "email": "seller@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "seller",
  "company": "Eco Waste LLC",
  "phone": "+234-701-234-5678"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "seller@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "seller",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Email already exists",
  "statusCode": 409
}

{
  "success": false,
  "message": "Password must be at least 8 characters",
  "statusCode": 400
}
```

**Validation Rules:**

- Email: valid email format, unique
- Password: minimum 8 characters, must include uppercase, lowercase, number, special character
- FirstName/LastName: required, 2-50 characters
- Role: must be one of ["seller", "recycler"]

---

#### POST `/auth/login`

**Description:** Login user and receive JWT token

**Request Body:**

```json
{
  "email": "seller@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "seller@example.com",
      "role": "seller",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Invalid email or password",
  "statusCode": 401
}

{
  "success": false,
  "message": "Account is suspended",
  "statusCode": 403
}
```

---

#### POST `/auth/refresh-token`

**Description:** Refresh expired JWT token

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### POST `/auth/logout`

**Description:** Logout user and invalidate token

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

#### POST `/auth/forgot-password`

**Description:** Request password reset email

**Request Body:**

```json
{
  "email": "seller@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

#### POST `/auth/reset-password`

**Description:** Reset password with reset token

**Request Body:**

```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePassword123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### 2. User Profile Endpoints

#### GET `/users/me`

**Description:** Get current logged-in user's profile

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "seller@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Eco Waste LLC",
    "phone": "+234-701-234-5678",
    "bio": "Professional e-waste recycling specialist",
    "location": "Lagos",
    "country": "Nigeria",
    "city": "Lagos",
    "profileImage": "https://res.cloudinary.com/...",
    "role": "seller",
    "rating": {
      "average": 4.8,
      "count": 156,
      "totalReviews": 156
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

#### GET `/users/:userId`

**Description:** Get public profile of any user

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Eco Waste LLC",
    "profileImage": "https://res.cloudinary.com/...",
    "bio": "Professional e-waste recycling specialist",
    "location": "Lagos",
    "rating": {
      "average": 4.8,
      "count": 156
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

#### PUT `/users/me`

**Description:** Update current user's profile

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "location": "Lagos",
  "city": "Lagos",
  "company": "Updated Company Name",
  "phone": "+234-701-234-5678"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "bio": "Updated bio",
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

#### POST `/users/upload-avatar`

**Description:** Upload profile avatar image

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Request Body:**

```
Form Data:
  file: <image_file>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "profileImage": "https://res.cloudinary.com/..."
  }
}
```

---

#### DELETE `/users/me`

**Description:** Soft delete user account

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

### 3. Listings Endpoints

#### POST `/listings`

**Description:** Create a new e-waste listing

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Used Dell Laptop",
  "description": "Fully functional Dell Latitude laptop in good condition",
  "category": "507f1f77bcf86cd799439012",
  "price": 450,
  "quantity": 2,
  "unit": "pieces",
  "condition": "good",
  "location": "Lagos",
  "city": "Lagos",
  "country": "Nigeria",
  "pickupAvailable": true,
  "deliveryAvailable": false,
  "tags": ["laptop", "dell", "refurbished"]
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Listing created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Used Dell Laptop",
    "sellerId": "507f1f77bcf86cd799439011",
    "price": 450,
    "status": "active",
    "views": 0,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

#### GET `/listings`

**Description:** Get all active listings with filtering and pagination

**Query Parameters:**

```
?page=1
&limit=10
&category=507f1f77bcf86cd799439012
&condition=good
&location=Lagos
&minPrice=100
&maxPrice=1000
&search=laptop
&sortBy=createdAt
&sortOrder=desc
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Used Dell Laptop",
        "description": "Fully functional...",
        "category": "507f1f77bcf86cd799439012",
        "sellerId": "507f1f77bcf86cd799439011",
        "sellerName": "John Doe",
        "price": 450,
        "quantity": 2,
        "unit": "pieces",
        "condition": "good",
        "images": ["https://res.cloudinary.com/..."],
        "location": "Lagos",
        "status": "active",
        "views": 45,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "pages": 15
    }
  }
}
```

---

#### GET `/listings/:listingId`

**Description:** Get detailed view of a single listing

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Used Dell Laptop",
    "description": "Fully functional Dell Latitude laptop...",
    "category": "507f1f77bcf86cd799439012",
    "categoryName": "Laptops & Computers",
    "sellerId": "507f1f77bcf86cd799439011",
    "sellerName": "John Doe",
    "sellerCompany": "Eco Waste LLC",
    "sellerRating": 4.8,
    "price": 450,
    "quantity": 2,
    "unit": "pieces",
    "condition": "good",
    "images": ["https://res.cloudinary.com/..."],
    "location": "Lagos",
    "city": "Lagos",
    "country": "Nigeria",
    "pickupAvailable": true,
    "deliveryAvailable": false,
    "status": "active",
    "views": 45,
    "favorites": 12,
    "tags": ["laptop", "dell", "refurbished"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Side Effect:** Increment listing views counter

---

#### PUT `/listings/:listingId`

**Description:** Update a listing

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "title": "Updated: Used Dell Laptop",
  "price": 400,
  "quantity": 1,
  "description": "Updated description..."
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Listing updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Updated: Used Dell Laptop",
    "price": 400,
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

**Authorization:** Only seller who created listing or admin can update

---

#### DELETE `/listings/:listingId`

**Description:** Delete (soft delete) a listing

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Listing deleted successfully"
}
```

**Authorization:** Only seller who created listing or admin can delete

---

#### POST `/listings/:listingId/upload-images`

**Description:** Upload images for a listing

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Request Body:**

```
Form Data:
  files: <multiple_image_files>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": {
    "images": [
      "https://res.cloudinary.com/...",
      "https://res.cloudinary.com/..."
    ]
  }
}
```

---

#### POST `/listings/:listingId/favorite`

**Description:** Add listing to favorites

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Added to favorites",
  "data": {
    "isFavorited": true,
    "favoriteCount": 13
  }
}
```

---

#### DELETE `/listings/:listingId/favorite`

**Description:** Remove listing from favorites

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Removed from favorites",
  "data": {
    "isFavorited": false,
    "favoriteCount": 12
  }
}
```

---

### 4. Inventory Endpoints

#### GET `/inventory`

**Description:** Get current user's inventory items

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?page=1
&limit=20
&category=507f1f77bcf86cd799439012
&search=laptop
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "inventory": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "itemName": "Dell Latitude Laptop",
        "sku": "DELL-001",
        "category": "507f1f77bcf86cd799439012",
        "categoryName": "Laptops & Computers",
        "quantity": 12,
        "unit": "pieces",
        "condition": "good",
        "value": 450,
        "activeListingId": "507f1f77bcf86cd799439013",
        "lastUpdated": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    },
    "summary": {
      "totalItems": 64,
      "totalItemTypes": 5,
      "estimatedValue": 28800
    }
  }
}
```

---

#### POST `/inventory`

**Description:** Add new inventory item

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "itemName": "Dell Latitude Laptop",
  "category": "507f1f77bcf86cd799439012",
  "sku": "DELL-001",
  "quantity": 12,
  "unit": "pieces",
  "condition": "good",
  "value": 450
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Inventory item added",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "itemName": "Dell Latitude Laptop",
    "quantity": 12,
    "sku": "DELL-001"
  }
}
```

**Validation:**

- SKU must be unique per seller
- Quantity must be positive integer
- Category must exist

---

#### PUT `/inventory/:inventoryId`

**Description:** Update inventory item

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "quantity": 10,
  "condition": "good",
  "value": 400
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Inventory item updated",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "quantity": 10,
    "value": 400,
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

#### DELETE `/inventory/:inventoryId`

**Description:** Delete inventory item

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Inventory item deleted"
}
```

---

### 5. Messages & Conversations Endpoints

#### GET `/conversations`

**Description:** Get all conversations for current user

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?page=1
&limit=20
&status=active
&search=john
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "_id": "507f1f77bcf86cd799439030",
        "participants": [
          {
            "userId": "507f1f77bcf86cd799439011",
            "userName": "John Doe",
            "userImage": "https://res.cloudinary.com/...",
            "lastReadAt": "2024-01-15T10:30:00Z"
          },
          {
            "userId": "507f1f77bcf86cd799439012",
            "userName": "Jane Smith",
            "userImage": "https://res.cloudinary.com/...",
            "lastReadAt": "2024-01-15T09:00:00Z"
          }
        ],
        "listingId": "507f1f77bcf86cd799439013",
        "listingTitle": "Used Dell Laptop",
        "messageCount": 12,
        "lastMessage": {
          "text": "When can we meet?",
          "senderId": "507f1f77bcf86cd799439012",
          "sentAt": "2024-01-15T10:30:00Z"
        },
        "status": "active",
        "createdAt": "2024-01-14T15:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

---

#### POST `/conversations`

**Description:** Create or get existing conversation

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "participantId": "507f1f77bcf86cd799439012",
  "listingId": "507f1f77bcf86cd799439013"
}
```

**Response (201 or 200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "participants": [...],
    "listingId": "507f1f77bcf86cd799439013",
    "status": "active"
  }
}
```

---

#### GET `/conversations/:conversationId/messages`

**Description:** Get messages in a conversation

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?page=1
&limit=50
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "507f1f77bcf86cd799439031",
        "conversationId": "507f1f77bcf86cd799439030",
        "senderId": "507f1f77bcf86cd799439011",
        "senderName": "John Doe",
        "text": "Hi! I'm interested in your laptop",
        "isRead": true,
        "readAt": "2024-01-15T10:35:00Z",
        "attachments": [],
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 12,
      "pages": 1
    }
  }
}
```

---

#### POST `/conversations/:conversationId/messages`

**Description:** Send a message

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**

```json
{
  "text": "Yes, all items are in perfect condition!",
  "attachments": []
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Message sent",
  "data": {
    "_id": "507f1f77bcf86cd799439032",
    "conversationId": "507f1f77bcf86cd799439030",
    "senderId": "507f1f77bcf86cd799439011",
    "text": "Yes, all items are in perfect condition!",
    "isRead": false,
    "createdAt": "2024-01-15T10:32:00Z"
  }
}
```

**Side Effects:**

- Update conversation's `lastMessage` and `updatedAt`
- Emit real-time event via Socket.io

---

#### PUT `/conversations/:conversationId/messages/:messageId`

**Description:** Edit a message (within 5 minutes of sending)

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "text": "Updated message text"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439032",
    "text": "Updated message text",
    "updatedAt": "2024-01-15T10:33:00Z"
  }
}
```

---

#### DELETE `/conversations/:conversationId/messages/:messageId`

**Description:** Delete a message

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Message deleted"
}
```

---

#### PUT `/conversations/:conversationId/read`

**Description:** Mark all messages as read

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Messages marked as read"
}
```

---

### 6. Notifications Endpoints

#### GET `/notifications`

**Description:** Get current user's notifications

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?page=1
&limit=20
&type=message
&isRead=false
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "_id": "507f1f77bcf86cd799439040",
        "userId": "507f1f77bcf86cd799439011",
        "type": "message",
        "title": "New message from John Doe",
        "message": "Hi! I'm interested in your laptop",
        "relatedId": "507f1f77bcf86cd799439030",
        "relatedType": "conversation",
        "isRead": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 8,
      "pages": 1
    },
    "unreadCount": 3
  }
}
```

---

#### PUT `/notifications/:notificationId/read`

**Description:** Mark notification as read

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439040",
    "isRead": true,
    "readAt": "2024-01-15T10:35:00Z"
  }
}
```

---

#### PUT `/notifications/read-all`

**Description:** Mark all notifications as read

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

#### DELETE `/notifications/:notificationId`

**Description:** Delete a notification

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

### 7. Settings Endpoints

#### GET `/settings`

**Description:** Get current user's settings

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "userId": "507f1f77bcf86cd799439011",
    "notifications": {
      "email": true,
      "sms": false,
      "marketingEmails": true,
      "newListingAlerts": true,
      "messageNotifications": true,
      "push": false
    },
    "privacy": {
      "twoFactorAuth": false,
      "privateProfile": false,
      "showEmail": false
    },
    "emailFrequency": "instant",
    "theme": "light",
    "language": "en"
  }
}
```

---

#### PUT `/settings`

**Description:** Update user settings

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "notifications": {
    "email": true,
    "sms": false,
    "marketingEmails": false,
    "newListingAlerts": true,
    "messageNotifications": true
  },
  "privacy": {
    "twoFactorAuth": true,
    "privateProfile": false,
    "showEmail": false
  },
  "emailFrequency": "daily",
  "theme": "dark"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Settings updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "notifications": {...},
    "privacy": {...},
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

#### POST `/settings/verify-2fa`

**Description:** Enable two-factor authentication

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,...",
    "secret": "JBSWY3DPEBLW64TMMQ======",
    "message": "Scan QR code with authenticator app and verify with code"
  }
}
```

---

#### POST `/settings/confirm-2fa`

**Description:** Confirm 2FA setup with code

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "code": "123456"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Two-factor authentication enabled"
}
```

---

#### POST `/settings/change-password`

**Description:** Change user password

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword456!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 8. Admin Endpoints

#### GET `/admin/users`

**Description:** Get all users (admin only)

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?page=1
&limit=20
&role=seller
&status=active
&search=john
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "email": "seller@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "seller",
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "rating": {
          "average": 4.8,
          "count": 156
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 450,
      "pages": 23
    }
  }
}
```

**Authorization:** Admin only

---

#### PUT `/admin/users/:userId/suspend`

**Description:** Suspend a user account

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "reason": "Suspicious activity detected",
  "duration": 7
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "User suspended for 7 days",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "suspended",
    "suspendedUntil": "2024-01-22T11:30:00Z"
  }
}
```

---

#### DELETE `/admin/users/:userId`

**Description:** Permanently delete a user

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "message": "User deleted permanently"
}
```

---

#### GET `/admin/listings`

**Description:** Get all listings for moderation

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?page=1
&limit=20
&status=pending
&reason=reported
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Used Dell Laptop",
        "sellerId": "507f1f77bcf86cd799439011",
        "status": "active",
        "reports": 2,
        "reportReasons": ["inappropriate_content", "duplicate"],
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1200,
      "pages": 60
    }
  }
}
```

---

#### DELETE `/admin/listings/:listingId`

**Description:** Remove a listing

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "reason": "Violates community guidelines",
  "notifyUser": true
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Listing removed",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "removed"
  }
}
```

---

#### GET `/admin/categories`

**Description:** Get all categories

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Electronics",
        "slug": "electronics",
        "parentCategoryId": null,
        "isActive": true,
        "displayOrder": 1,
        "listingCount": 234
      }
    ]
  }
}
```

---

#### POST `/admin/categories`

**Description:** Create a new category

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "name": "New Category",
  "description": "Category description",
  "parentCategoryId": null,
  "displayOrder": 5
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Category created",
  "data": {
    "_id": "507f1f77bcf86cd799439051",
    "name": "New Category",
    "slug": "new-category"
  }
}
```

---

#### GET `/admin/analytics/dashboard`

**Description:** Get platform analytics

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?dateRange=30d
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "analytics": {
      "users": {
        "total": 1250,
        "active": 890,
        "newThisMonth": 156,
        "byRole": {
          "seller": 450,
          "recycler": 750,
          "admin": 50
        }
      },
      "listings": {
        "total": 2340,
        "active": 1890,
        "newThisMonth": 340,
        "byCategory": {
          "electronics": 890,
          "computers": 450
        }
      },
      "messages": {
        "thisMonth": 8934,
        "averagePerDay": 298
      },
      "revenue": {
        "thisMonth": 0,
        "note": "Payment processing not implemented in MVP"
      }
    }
  }
}
```

---

#### GET `/admin/logs`

**Description:** Get admin action logs

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**

```
?page=1
&limit=50
&action=user_suspended
&dateRange=7d
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "_id": "507f1f77bcf86cd799439060",
        "adminId": "507f1f77bcf86cd799439001",
        "adminEmail": "admin@example.com",
        "action": "user_suspended",
        "entityType": "user",
        "entityId": "507f1f77bcf86cd799439011",
        "reason": "Suspicious activity",
        "ipAddress": "192.168.1.1",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 234,
      "pages": 5
    }
  }
}
```

---

### 9. Categories Endpoint

#### GET `/categories`

**Description:** Get all active categories

**Query Parameters:**

```
?includeParent=true
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Electronics",
        "slug": "electronics",
        "description": "Electronic waste items",
        "icon": "https://res.cloudinary.com/...",
        "parentCategoryId": null,
        "children": [
          {
            "_id": "507f1f77bcf86cd799439013",
            "name": "Laptops & Computers",
            "slug": "laptops-computers"
          }
        ],
        "listingCount": 234
      }
    ]
  }
}
```

---

### 10. Ratings/Reviews Endpoint

#### POST `/ratings`

**Description:** Leave a review for a user

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "toUserId": "507f1f77bcf86cd799439012",
  "listingId": "507f1f77bcf86cd799439013",
  "conversationId": "507f1f77bcf86cd799439030",
  "rating": 5,
  "title": "Great quality and fast shipping!",
  "comment": "Excellent condition, exactly as described. Highly recommended!"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Review submitted",
  "data": {
    "_id": "507f1f77bcf86cd799439061",
    "fromUserId": "507f1f77bcf86cd799439011",
    "toUserId": "507f1f77bcf86cd799439012",
    "rating": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

#### GET `/users/:userId/ratings`

**Description:** Get reviews for a user

**Query Parameters:**

```
?page=1
&limit=10
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "ratings": [
      {
        "_id": "507f1f77bcf86cd799439061",
        "fromUserId": "507f1f77bcf86cd799439011",
        "fromUserName": "John Doe",
        "fromUserImage": "https://res.cloudinary.com/...",
        "rating": 5,
        "title": "Great quality!",
        "comment": "Excellent condition...",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "summary": {
      "averageRating": 4.8,
      "totalReviews": 156,
      "ratingBreakdown": {
        "5": 140,
        "4": 12,
        "3": 3,
        "2": 1,
        "1": 0
      }
    }
  }
}
```

---

## Authentication & Authorization Flow

### JWT Token Structure

**Access Token (expires in 1 hour):**

```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "iss": "e-cycle-api",
    "sub": "507f1f77bcf86cd799439011",
    "email": "seller@example.com",
    "role": "seller",
    "iat": 1705334400,
    "exp": 1705338000,
    "aud": "e-cycle-frontend"
  }
}
```

**Refresh Token (expires in 7 days):**

```javascript
{
  "payload": {
    "sub": "507f1f77bcf86cd799439011",
    "type": "refresh",
    "iat": 1705334400,
    "exp": 1705939200
  }
}
```

### Authentication Flow Diagram

```
┌─────────────────────────────────────────┐
│   Frontend (React)                      │
└──────────────┬──────────────────────────┘
               │
               │ POST /auth/register (email, password, role)
               │ or
               │ POST /auth/login (email, password)
               ▼
┌──────────────────────────────────────────┐
│   Backend (Express)                      │
│  ├─ Hash password (bcrypt)               │
│  ├─ Validate input                       │
│  ├─ Create user in MongoDB               │
│  ├─ Generate JWT token                   │
│  └─ Return token + refresh token         │
└──────────────┬──────────────────────────┘
               │
               │ Returns: { token, refreshToken, user }
               ▼
┌──────────────────────────────────────────┐
│   Frontend Storage                       │
│  ├─ localStorage: token, refreshToken    │
│  └─ In-memory: user data                 │
└──────────────────────────────────────────┘

For subsequent requests:
┌─────────────────────────────────────────┐
│   Frontend                              │
│  Authorization: Bearer <token>          │
└──────────────┬──────────────────────────┘
               │
               │ GET /api/users/me
               ▼
┌──────────────────────────────────────────┐
│   Middleware: Auth Check                 │
│  ├─ Extract token from header            │
│  ├─ Verify JWT signature                 │
│  ├─ Check token expiration               │
│  ├─ Extract user ID from payload         │
│  └─ Attach user to request               │
└──────────────┬──────────────────────────┘
               │
         ┌─────┴──────┐
         │            │
    ✓ Valid      ✗ Invalid/Expired
         │            │
         ▼            ▼
    Proceed      Return 401
    Request      Unauthorized

When token expires:
┌──────────────────────────────────────┐
│   Frontend detects 401 error          │
│   POST /auth/refresh-token            │
│   { refreshToken }                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│   Backend: Validate refresh token     │
│   Generate new access token           │
│   Return new token                    │
└──────────────┬──────────────────────┘
               │
               ▼
    Retry original request with new token
```

### Role-Based Access Control

**Permission Matrix:**

| Endpoint            | Seller  | Recycler | Admin | Public |
| ------------------- | ------- | -------- | ----- | ------ |
| POST /listings      | ✓       | ✗        | ✓     | ✗      |
| GET /listings       | ✓       | ✓        | ✓     | ✓      |
| PUT /listings/:id   | ✓ (own) | ✗        | ✓     | ✗      |
| GET /inventory      | ✓       | ✗        | ✓     | ✗      |
| POST /conversations | ✓       | ✓        | ✗     | ✗      |
| POST /messages      | ✓       | ✓        | ✗     | ✗      |
| GET /admin/\*       | ✗       | ✗        | ✓     | ✗      |
| PUT /admin/\*       | ✗       | ✗        | ✓     | ✗      |

### Two-Factor Authentication Flow

```
1. User enables 2FA in settings
   POST /settings/verify-2fa
   ↓
   Backend generates secret + QR code
   ↓
   Frontend displays QR code

2. User scans with authenticator app
   ↓
   Frontend prompts for 6-digit code

3. User submits code
   POST /settings/confirm-2fa { code }
   ↓
   Backend verifies TOTP code
   ↓
   If valid: Enable 2FA + Save secret
   If invalid: Return error

4. At login time:
   POST /auth/login { email, password }
   ↓
   If 2FA enabled, return:
   {
     "requires2FA": true,
     "tempToken": "..."
   }
   ↓
   Frontend prompts for 2FA code
   ↓
   POST /auth/verify-2fa { code, tempToken }
   ↓
   Return full JWT token if code is valid
```

---

## Backend Folder Structure

### Recommended Directory Layout

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   ├── cloudinary.js        # Cloudinary setup
│   │   ├── sendgrid.js          # SendGrid setup
│   │   ├── jwt.js               # JWT secret & options
│   │   └── environment.js       # Env variable validation
│   │
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Listing.js           # Listing schema
│   │   ├── Inventory.js         # Inventory schema
│   │   ├── Conversation.js      # Conversation schema
│   │   ├── Message.js           # Message schema
│   │   ├── Notification.js      # Notification schema
│   │   ├── Settings.js          # Settings schema
│   │   ├── Category.js          # Category schema
│   │   ├── Rating.js            # Rating schema
│   │   └── AdminLog.js          # Admin audit log schema
│   │
│   ├── controllers/
│   │   ├── authController.js    # Auth endpoints
│   │   ├── userController.js    # User profile endpoints
│   │   ├── listingController.js # Listing CRUD
│   │   ├── inventoryController.js # Inventory CRUD
│   │   ├── messageController.js # Messages & conversations
│   │   ├── notificationController.js # Notifications
│   │   ├── settingsController.js # Settings
│   │   ├── categoryController.js # Categories
│   │   ├── ratingController.js  # Reviews/ratings
│   │   ├── uploadController.js  # Image uploads
│   │   └── adminController.js   # Admin operations
│   │
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── users.js             # User routes
│   │   ├── listings.js          # Listing routes
│   │   ├── inventory.js         # Inventory routes
│   │   ├── messages.js          # Messages routes
│   │   ├── notifications.js     # Notification routes
│   │   ├── settings.js          # Settings routes
│   │   ├── categories.js        # Category routes
│   │   ├── ratings.js           # Rating routes
│   │   ├── upload.js            # Upload routes
│   │   ├── admin.js             # Admin routes
│   │   └── index.js             # Router aggregator
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── roleMiddleware.js    # Role-based access
│   │   ├── errorHandler.js      # Global error handling
│   │   ├── validation.js        # Input validation
│   │   ├── rateLimiter.js       # Rate limiting
│   │   ├── corsConfig.js        # CORS setup
│   │   └── logging.js           # Request logging
│   │
│   ├── services/
│   │   ├── authService.js       # Auth business logic
│   │   ├── userService.js       # User operations
│   │   ├── listingService.js    # Listing operations
│   │   ├── inventoryService.js  # Inventory operations
│   │   ├── messageService.js    # Message operations
│   │   ├── notificationService.js # Notification logic
│   │   ├── emailService.js      # SendGrid integration
│   │   ├── uploadService.js     # Cloudinary integration
│   │   ├── ratingService.js     # Rating calculations
│   │   └── adminService.js      # Admin operations
│   │
│   ├── sockets/
│   │   ├── messageSocket.js     # Real-time messaging
│   │   ├── notificationSocket.js # Real-time notifications
│   │   └── events.js            # Socket event handlers
│   │
│   ├── utils/
│   │   ├── validators.js        # Input validation rules
│   │   ├── errorTypes.js        # Custom error classes
│   │   ├── formatResponse.js    # Standardized responses
│   │   ├── pagination.js        # Pagination helper
│   │   ├── encryption.js        # Password hashing utils
│   │   ├── jwt.js               # JWT utilities
│   │   ├── logger.js            # Logging utility
│   │   └── constants.js         # App constants
│   │
│   └── app.js                   # Express app setup
│
├── tests/
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── fixtures/                # Test data
│
├── .env.example                 # Example environment variables
├── .env                         # (gitignored) Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                    # Entry point
└── README.md                    # Setup documentation
```

### Key Files Explained

**`src/app.js`** - Express app initialization:

```javascript
const express = require("express");
const cors = require("cors");
const mongoSanitize = require("mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const socketIo = require("socket.io");

const app = express();

// Security
app.use(helmet());
app.use(mongoSanitize());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// Body parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/listings", require("./routes/listings"));
// ... more routes

// Error handling
app.use(require("./middlewares/errorHandler"));

module.exports = app;
```

**`server.js`** - Server entry point:

```javascript
const app = require("./src/app");
const http = require("http");
const socketIo = require("socket.io");
const { connectDB } = require("./src/config/database");
const messageSocket = require("./src/sockets/messageSocket");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket namespaces
io.of("/socket/messages").on("connection", messageSocket);

connectDB().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});
```

---

## Business Logic Requirements

### 1. User Registration & Email Verification

**Flow:**

1. User submits email + password + role
2. Backend validates input
3. Hash password using bcrypt (10 rounds)
4. Create user in MongoDB
5. Send verification email via SendGrid
6. Return JWT token + refresh token
7. Frontend redirects to profile completion

**Code Example:**

```javascript
// userService.js
async function registerUser(email, password, role) {
  // Validate
  if (!email || !password || !role) throw new ValidationError();

  // Check exists
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new DuplicateError("Email already exists");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    isEmailVerified: false,
  });

  await user.save();

  // Send verification email
  await emailService.sendVerificationEmail(user._id, user.email);

  // Generate tokens
  const { token, refreshToken } = generateTokens(user);

  return { user, token, refreshToken };
}
```

### 2. Listing Creation & Image Upload

**Flow:**

1. Seller creates listing with details
2. Upload images to Cloudinary
3. Save listing to MongoDB
4. Create notification for matching recyclers
5. Update inventory if linked

**Validation Rules:**

- Title: 10-100 characters
- Description: 50-5000 characters
- Price: positive number
- Quantity: positive integer
- At least 1 image required
- Images max 5MB each, max 10 images

**Code Example:**

```javascript
// listingService.js
async function createListing(userId, listingData, images) {
  // Validate
  validateListingData(listingData);

  // Upload images
  const imageUrls = [];
  for (const image of images) {
    const result = await uploadService.uploadToCloudinary(image);
    imageUrls.push(result.secure_url);
  }

  // Create listing
  const listing = new Listing({
    ...listingData,
    sellerId: userId,
    images: imageUrls,
    status: "active",
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
  });

  await listing.save();

  // Update inventory if linked
  if (listingData.inventoryId) {
    await Inventory.findByIdAndUpdate(listingData.inventoryId, {
      activeListingId: listing._id,
    });
  }

  // Notify interested users
  await notificationService.notifyMatchingRecyclers(listing);

  return listing;
}
```

### 3. Real-Time Messaging

**Flow:**

1. User sends message
2. Save to MongoDB
3. Emit via Socket.io to recipient
4. Update conversation timestamps
5. Create notification for recipient
6. Send email if preference enabled

**Code Example:**

```javascript
// messageSocket.js
io.of("/socket/messages").on("connection", (socket) => {
  socket.on("send-message", async (data) => {
    const { conversationId, text, senderId } = data;

    // Save to DB
    const message = new Message({
      conversationId,
      senderId,
      text,
    });
    await message.save();

    // Update conversation
    const conversation = await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        text,
        senderId,
        sentAt: new Date(),
      },
      updatedAt: new Date(),
    });

    // Get recipient
    const recipientId = conversation.participants.find(
      (p) => p.userId.toString() !== senderId,
    )?.userId;

    // Emit to recipient
    socket.broadcast.emit("receive-message", {
      message,
      conversationId,
    });

    // Create notification
    await notificationService.createNotification({
      userId: recipientId,
      type: "message",
      title: "New message",
      relatedId: conversationId,
      relatedType: "conversation",
    });
  });
});
```

### 4. Notification System

**Types:**

- `message`: New message received
- `listing_alert`: Matching listing posted
- `rating`: User rated you
- `marketing`: Platform announcements
- `system`: System messages

**Delivery Channels:**

- In-app (always)
- Email (based on preference)
- SMS (not MVP)
- Push (future)

**Code Example:**

```javascript
// notificationService.js
async function createNotification(data) {
  const notification = new Notification({
    userId: data.userId,
    type: data.type,
    title: data.title,
    message: data.message,
    relatedId: data.relatedId,
    relatedType: data.relatedType,
    deliveredVia: ["in_app"],
  });

  await notification.save();

  // Check user preferences
  const settings = await Settings.findOne({ userId: data.userId });

  // Send email if enabled
  if (shouldSendEmail(data.type, settings)) {
    notification.deliveredVia.push("email");
    await emailService.sendNotificationEmail(
      data.userId,
      data.title,
      data.message,
    );
    notification.emailSent = true;
    notification.emailSentAt = new Date();
  }

  await notification.save();

  // Emit via Socket.io
  io.to(data.userId.toString()).emit("notification", notification);

  return notification;
}
```

### 5. Search & Filtering

**Elasticsearch Alternative (MongoDB Text Search):**

```javascript
// In listing schema
listingSchema.index({ title: "text", description: "text" });

// In controller
async function searchListings(query) {
  const filters = {
    status: "active",
  };

  if (query.search) {
    filters.$text = { $search: query.search };
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) filters.price.$gte = query.minPrice;
    if (query.maxPrice) filters.price.$lte = query.maxPrice;
  }

  if (query.location) {
    filters.location = new RegExp(query.location, "i");
  }

  const skip = (query.page - 1) * query.limit;

  const listings = await Listing.find(filters)
    .sort({ [query.sortBy]: query.sortOrder === "desc" ? -1 : 1 })
    .skip(skip)
    .limit(query.limit)
    .populate("sellerId", "firstName lastName profileImage");

  const total = await Listing.countDocuments(filters);

  return { listings, total };
}
```

### 6. Rating & Review System

**Logic:**

- Users can only rate after conversation/transaction
- One review per user per listing
- Average rating calculated on write
- Reviews displayed after moderation

**Code Example:**

```javascript
// ratingService.js
async function createRating(data) {
  const { fromUserId, toUserId, listingId, rating } = data;

  // Validate one review per user per listing
  const existing = await Rating.findOne({
    fromUserId,
    toUserId,
    listingId,
  });

  if (existing) throw new Error("You already reviewed this user");

  const newRating = new Rating(data);
  await newRating.save();

  // Update user rating average
  const ratings = await Rating.find({
    toUserId,
    isVisible: true,
  });

  const average =
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

  await User.findByIdAndUpdate(toUserId, {
    "rating.average": parseFloat(average.toFixed(1)),
    "rating.count": ratings.length,
    "rating.totalReviews": ratings.length,
  });

  return newRating;
}
```

### 7. Inventory Management

**Logic:**

- Sellers add items with quantities
- When listed, quantity reserved
- On listing expiry, quantity released
- Track stock across multiple listings

**Code Example:**

```javascript
// inventoryService.js
async function updateInventoryFromListing(listingId, quantityChange) {
  const listing = await Listing.findById(listingId);

  const inventory = await Inventory.findOne({
    activeListingId: listingId,
  });

  if (!inventory) return;

  const newQuantity = inventory.quantity - quantityChange;

  if (newQuantity <= 0) {
    // Mark listing as sold
    await Listing.findByIdAndUpdate(listingId, { status: "sold" });
    inventory.activeListingId = null;
  }

  inventory.quantity = Math.max(0, newQuantity);
  await inventory.save();
}
```

---

## Integration With Frontend

### Frontend Setup

**1. Install Dependencies:**

```bash
npm install axios socket.io-client
```

**2. Create API Client:**

```javascript
// client/services/api.js
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
        );

        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);

        apiClient.defaults.headers.Authorization = `Bearer ${data.token}`;
        return apiClient(original);
      } catch (err) {
        // Redirect to login
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
```

### API Hook Examples

**Auth Hook:**

```javascript
// client/hooks/useAuth.js
import { useState, useCallback } from "react";
import apiClient from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(async (email, password, role) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post("/auth/register", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, register, login };
}
```

**Listings Hook:**

```javascript
// client/hooks/useListings.js
import { useState, useCallback } from "react";
import apiClient from "../services/api";

export function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const getListings = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/listings", { params: filters });
      setListings(data.data.listings);
      setPagination(data.data.pagination);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createListing = useCallback(
    async (formData) => {
      const { data } = await apiClient.post("/listings", formData);
      setListings([data.data, ...listings]);
      return data.data;
    },
    [listings],
  );

  const uploadListingImages = useCallback(async (listingId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const { data } = await apiClient.post(
      `/listings/${listingId}/upload-images`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return data.data.images;
  }, []);

  return {
    listings,
    loading,
    pagination,
    getListings,
    createListing,
    uploadListingImages,
  };
}
```

**Messages Hook:**

```javascript
// client/hooks/useMessages.js
import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api";
import { io } from "socket.io-client";

export function useMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Connect to Socket.io
    const newSocket = io(`${process.env.REACT_APP_API_URL}/socket/messages`, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => newSocket.disconnect();
  }, []);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(
        `/conversations/${conversationId}/messages`,
      );
      setMessages(data.data.messages);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  const sendMessage = useCallback(
    async (text) => {
      // Optimistic update
      const tempMessage = {
        _id: `temp-${Date.now()}`,
        senderId: "me",
        text,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, tempMessage]);

      try {
        const { data } = await apiClient.post(
          `/conversations/${conversationId}/messages`,
          { text },
        );

        // Replace temp message with real one
        setMessages((prev) =>
          prev.map((m) => (m._id === tempMessage._id ? data.data : m)),
        );
      } catch (error) {
        // Remove temp message on error
        setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
        throw error;
      }
    },
    [conversationId],
  );

  return { messages, loading, fetchMessages, sendMessage };
}
```

### Frontend Page Integration Examples

**Dashboard Page:**

```javascript
// client/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import apiClient from "../services/api";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get user metrics
        const { data: metricsData } = await apiClient.get("/users/me/metrics");
        setMetrics(metricsData.data);

        // Get user's listings
        const { data: listingsData } = await apiClient.get("/listings", {
          params: { sellerId: "me", limit: 5 },
        });
        setListings(listingsData.data.listings);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>

      <div className="metrics">
        <div className="metric-card">
          <p>Active Recyclers</p>
          <p className="value">{metrics.activeRecyclers}</p>
        </div>
        <div className="metric-card">
          <p>Listing Views</p>
          <p className="value">{metrics.listingViews}</p>
        </div>
      </div>

      <div className="recent-listings">
        <h2>Recent Listings</h2>
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h3>{listing.title}</h3>
            <p>₦{listing.price}</p>
            <p>Views: {listing.views}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Listings Page:**

```javascript
// client/pages/Listings.jsx
import { useEffect, useState } from "react";
import apiClient from "../services/api";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await apiClient.get("/listings", { params: filters });
        setListings(data.data.listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [filters]);

  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value, page: 1 }));
  };

  return (
    <div className="listings-page">
      <h1>Browse E-Waste Listings</h1>

      <div className="filters">
        <input
          placeholder="Search listings..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option>All Categories</option>
          {/* Options from /categories endpoint */}
        </select>
      </div>

      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <img src={listing.images[0]} alt={listing.title} />
            <h3>{listing.title}</h3>
            <p className="price">₦{listing.price.toLocaleString()}</p>
            <p className="seller">{listing.sellerName}</p>
            <button
              onClick={() =>
                (window.location.href = `/listings/${listing._id}`)
              }
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Real-Time Messaging with Socket.io

### Socket.io Setup

**Backend Configuration:**

```javascript
// src/sockets/messageSocket.js
const messageSocket = (io) => {
  io.of("/socket/messages").on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    // Join user to room
    socket.join(`user-${userId}`);

    // Handle new message
    socket.on("send-message", async (data) => {
      const { conversationId, text } = data;

      try {
        // Save to DB
        const message = new Message({
          conversationId,
          senderId: userId,
          text,
        });
        await message.save();

        // Get conversation to find recipient
        const conversation = await Conversation.findById(conversationId);
        const recipientId = conversation.participants.find(
          (p) => p.userId.toString() !== userId,
        )?.userId;

        // Emit to both users
        io.of("/socket/messages").to(`user-${userId}`).emit("message-sent", {
          _id: message._id,
          text,
          sentAt: message.createdAt,
        });

        io.of("/socket/messages")
          .to(`user-${recipientId}`)
          .emit("message-received", {
            _id: message._id,
            conversationId,
            senderId: userId,
            text,
            sentAt: message.createdAt,
          });
      } catch (error) {
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    // Handle typing indicator
    socket.on("user-typing", (data) => {
      const { conversationId, isTyping } = data;
      socket.broadcast.emit("typing-indicator", {
        conversationId,
        userId,
        isTyping,
      });
    });

    // Handle message read
    socket.on("message-read", async (data) => {
      const { conversationId } = data;
      await Message.updateMany(
        { conversationId, senderId: { $ne: userId }, isRead: false },
        { isRead: true, readAt: new Date() },
      );
    });

    socket.on("disconnect", () => {
      socket.leave(`user-${userId}`);
    });
  });
};

module.exports = messageSocket;
```

**Frontend Usage:**

```javascript
// client/hooks/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocket(userId) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(`${process.env.REACT_APP_API_URL}/socket/messages`, {
      auth: {
        userId,
        token: localStorage.getItem("token"),
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to messages socket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from messages socket");
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef.current;
}

// Usage in component
export function Messages({ conversationId }) {
  const socket = useSocket(user._id);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (!inputValue.trim() || !socket) return;

    socket.emit("send-message", {
      conversationId,
      text: inputValue,
    });

    setInputValue("");
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("message-received", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("message-sent", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message-received");
      socket.off("message-sent");
    };
  }, [socket]);

  return (
    <div className="messages">
      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg._id} className="message">
            {msg.text}
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
```

---

## Error Handling & Edge Cases

### Standard Error Response Format

```javascript
{
  "success": false,
  "statusCode": 400,
  "message": "Descriptive error message",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/auth/register"
}
```

### HTTP Status Codes

| Code | Usage                             | Example                           |
| ---- | --------------------------------- | --------------------------------- |
| 200  | OK - Successful GET/PUT           | Listing fetched                   |
| 201  | Created - Successful POST         | User registered                   |
| 204  | No Content - Successful DELETE    | Item deleted                      |
| 400  | Bad Request - Invalid input       | Missing required field            |
| 401  | Unauthorized - Invalid token      | Expired JWT                       |
| 403  | Forbidden - No permission         | Recycler trying to create listing |
| 404  | Not Found - Resource missing      | Listing doesn't exist             |
| 409  | Conflict - Resource exists        | Email already registered          |
| 422  | Unprocessable - Validation failed | Invalid data format               |
| 429  | Too Many Requests - Rate limited  | Too many login attempts           |
| 500  | Server Error                      | Database connection failed        |
| 503  | Service Unavailable               | SendGrid API down                 |

### Custom Error Classes

```javascript
// src/utils/errorTypes.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date();
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 422);
    this.code = "VALIDATION_ERROR";
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401);
    this.code = "AUTH_ERROR";
  }
}

class AuthorizationError extends AppError {
  constructor(message = "Access denied") {
    super(message, 403);
    this.code = "FORBIDDEN";
  }
}

class DuplicateError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409);
    this.code = "DUPLICATE_ERROR";
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.code = "NOT_FOUND";
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  DuplicateError,
  NotFoundError,
};
```

### Global Error Handler Middleware

```javascript
// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    code: err.code,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
```

### Validation Middleware

```javascript
// src/middlewares/validation.js
const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      details: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

module.exports = handleValidation;
```

### Common Edge Cases

**1. Duplicate Email Registration:**

```javascript
const existing = await User.findOne({ email: email.toLowerCase() });
if (existing) {
  throw new DuplicateError("Email already registered");
}
```

**2. Listing Expiration:**

```javascript
// Cron job to expire old listings
const expireListings = async () => {
  await Listing.updateMany(
    { status: "active", expiresAt: { $lt: new Date() } },
    { status: "expired" },
  );
};

// Run daily
schedule.scheduleJob("0 0 * * *", expireListings);
```

**3. Concurrent Message Sends:**

```javascript
// Use transaction to prevent duplicate messages
const session = await mongoose.startSession();
session.startTransaction();

try {
  const message = await Message.create(
    [
      {
        conversationId,
        senderId,
        text,
      },
    ],
    { session },
  );

  await Conversation.findByIdAndUpdate(
    conversationId,
    { lastMessage: message[0], updatedAt: new Date() },
    { session },
  );

  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
```

**4. Rate Limiting on Auth Endpoints:**

```javascript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, try again later",
  skip: (req) => {
    // Allow admin IPs
    return process.env.ADMIN_IPS?.includes(req.ip);
  },
});

app.post("/api/auth/login", loginLimiter, authController.login);
```

**5. Image Upload Size Limits:**

```javascript
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});
```

---

## Deployment Guide

### Environment Variables

**`.env` file:**

```bash
# Server
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecycle?retryWrites=true&w=majority

# Frontend
FRONTEND_URL=https://your-domain.com
FRONTEND_DEV_URL=http://localhost:3000

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@e-cycle.com

# Admin Email
ADMIN_EMAIL=admin@e-cycle.com

# Logging
LOG_LEVEL=info
```

### Deployment Platforms

#### Option 1: Render.com

**Steps:**

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Create Web Service
4. Set environment variables
5. Deploy

**`render.yaml`:**

```yaml
services:
  - type: web
    name: ecycle-api
    env: node
    plan: standard
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        value: ${{ secrets.MONGODB_URI }}
      - key: JWT_SECRET
        value: ${{ secrets.JWT_SECRET }}
      # ... other env vars
```

#### Option 2: Railway.app

**Steps:**

1. Create Railway project
2. Add MongoDB plugin
3. Connect GitHub
4. Deploy

**Cost:** Free tier available, paid tiers from $5/month

#### Option 3: Heroku (Legacy)

**Steps:**

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-app-name

# Set env variables
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Database Deployment

**MongoDB Atlas (Recommended):**

1. Create cluster at mongodb.com/cloud/atlas
2. Create database user
3. Get connection string
4. Add IP whitelist (use 0.0.0.0/0 for development, restrict in production)
5. Use connection string in MONGODB_URI

### Image Storage Deployment

**Cloudinary Setup:**

1. Create account at cloudinary.com
2. Get Cloud Name, API Key, API Secret
3. Add to environment variables
4. No additional setup needed

### Email Service Deployment

**SendGrid Setup:**

1. Create account at sendgrid.com
2. Verify sender email
3. Create API key
4. Add to SENDGRID_API_KEY

### Security Checklist

- [ ] All secrets in environment variables
- [ ] JWT secrets are strong (>32 characters)
- [ ] HTTPS/SSL enabled
- [ ] CORS configured for frontend domain only
- [ ] Rate limiting enabled on sensitive endpoints
- [ ] Database backup enabled (MongoDB Atlas)
- [ ] Cloudinary API secret never exposed
- [ ] SendGrid API key never exposed
- [ ] Input validation on all endpoints
- [ ] SQL/NoSQL injection prevention
- [ ] CSRF protection if needed
- [ ] Security headers (helmet.js)
- [ ] Error messages don't leak sensitive info
- [ ] Logging doesn't contain sensitive data

### Monitoring

**Recommended Services:**

- **Error Tracking:** Sentry.io
- **Analytics:** Mixpanel or Amplitude
- **Uptime Monitoring:** Pingdom or UptimeRobot
- **Logs:** LogRocket or Loggly

**Example Sentry Integration:**

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### CI/CD Pipeline

**GitHub Actions Example:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Render

on:
  push:
    branches: [main, production]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: |
          curl https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}?key=${{ secrets.RENDER_API_KEY }}
```

### Performance Optimization

**Database Indexes:**

```javascript
// Already defined in schema section
db.users.createIndex({ email: 1 }, { unique: true });
db.listings.createIndex({ sellerId: 1 });
db.listings.createIndex({ status: 1 });
db.listings.createIndex({ createdAt: -1 });
```

**API Response Caching:**

```javascript
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

// Cache GET /listings for 5 minutes
app.get('/api/listings', async (req, res) => {
  const cacheKey = `listings:${JSON.stringify(req.query)}`;

  const cached = await client.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const data = await Listing.find({...});
  client.setex(cacheKey, 300, JSON.stringify(data));

  res.json(data);
});
```

**Request Pagination (Already Implemented):**

- Limit results to 50 items per page max
- Use skip/limit for efficiency
- Index on sort fields

### Scaling Considerations

As the app grows:

1. **Database:** Move to MongoDB Atlas with sharding
2. **File Storage:** Cloudinary already handles this
3. **Real-Time:** Socket.io with Redis adapter for multiple servers
4. **Cache:** Implement Redis for sessions and frequently accessed data
5. **Queue:** Use Bull or RabbitMQ for async jobs (email sending, notifications)
6. **CDN:** Use Cloudinary or CloudFlare for static assets

---

## Summary

This documentation provides a complete blueprint for building the E-Cycle backend. Key takeaways:

✅ **Tech Stack:** Node.js + Express + MongoDB + Socket.io
✅ **Database:** 10 collections with proper relationships
✅ **API:** 50+ endpoints for all features
✅ **Real-Time:** Socket.io for instant messaging
✅ **File Storage:** Cloudinary integration
✅ **Email:** SendGrid for notifications
✅ **Security:** JWT auth, role-based access, input validation
✅ **Deployment:** Multiple platform options ready
✅ **Frontend Integration:** Complete examples provided

**Next Steps:**

1. Create `package.json` with dependencies
2. Set up MongoDB cluster (MongoDB Atlas)
3. Set up Cloudinary account
4. Set up SendGrid account
5. Create folder structure
6. Implement core services (auth, users, listings)
7. Build controllers and routes
8. Add Socket.io messaging
9. Deploy to production
10. Monitor and optimize

---

**Document Created:** 2024  
**Backend Engineer Reference:** Yes  
**Production Ready:** Yes  
**Questions?** Reference specific sections above
