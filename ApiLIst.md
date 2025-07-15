# DevTinder Backend Documentation

DevTinder is a Tinder-like platform for developers to connect, collaborate, and network. This documentation covers the backend API, data models, authentication, and utility logic.

---

## Table of Contents
- [Overview](#overview)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Profile](#profile)
  - [Connection Requests](#connection-requests)
  - [User](#user)
- [Data Models](#data-models)
  - [User](#user-model)
  - [ConnectionRequest](#connectionrequest-model)
- [Middleware](#middleware)
- [Utilities](#utilities)
- [Database](#database)

---

## Overview
DevTinder allows developers to create profiles, view other users, send/receive connection requests, and manage their connections. The backend is built with Node.js, Express, and MongoDB.

---

## API Endpoints

### Authentication
- **POST /signup**: Register a new user.
- **POST /login**: Log in and receive a JWT token (set as cookie).
- **POST /logout**: Log out and clear the JWT token.

### Profile
- **GET /profile/view**: View your profile (requires authentication).
- **PATCH /profile/edit**: Edit your profile fields (requires authentication).
- **PATCH /profile/password/edit**: Change your password (requires authentication).
- **PATCH /profile/password/forgot**: Reset your password using email.

### Connection Requests
- **POST /request/send/:status/:toUserId**: Send a connection request to another user. `status` can be `ignored` or `interested`.
- **POST /request/review/:status/:requestId**: Review a received request. `status` can be `accepted` or `rejected`.

### User
- **GET /user/requests/received**: Get all received connection requests (status: interested).
- **GET /user/connections**: Get all accepted connections.
- **GET /feed**: Get a paginated list of other users you haven't interacted with.

---

## Data Models

### User Model
- **firstName**: String, required, min 3 chars
- **lastName**: String, required, min 3 chars
- **email**: String, required, unique, validated
- **password**: String, required, strong password, not selected by default
- **age**: Number (optional)
- **gender**: String, enum: [male, female, others]
- **photoUrl**: String, validated URL, default provided
- **about**: String, max 250 chars, default provided
- **skills**: Array of Strings, required, 1-10 items
- **timestamps**: Created/updated at

#### Methods
- **getJWT()**: Returns a JWT token for the user (7 days expiry)

### ConnectionRequest Model
- **fromUserId**: ObjectId (User), required
- **toUserId**: ObjectId (User), required
- **status**: String, enum: [ignored, interested, accepted, rejected]
- **timestamps**: Created/updated at

#### Hooks
- **Pre-save**: Prevents sending a request to yourself

---

## Middleware

### userAuth
- Checks for a valid JWT token in cookies
- Attaches the authenticated user to `req.user`
- Used to protect routes that require authentication

---

## Utilities

### Validation
- **validateSignupData(req)**: Validates signup fields (firstName, email, password, skills, etc.)
- **validateProfileEditData(req)**: Validates profile edit fields (firstName, lastName, about, skills, age, gender, email, photoUrl)

---

## Database
- MongoDB connection at `mongodb://localhost:27017/DevTinder`
- Connection established on server start

---

## Status Values
- **ignored**: User is not interested
- **interested**: User is interested
- **accepted**: Request accepted
- **rejected**: Request rejected

---

