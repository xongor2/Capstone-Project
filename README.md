# Personal Finance Tracker API

A robust RESTful API built with Node.js, Express, and MongoDB for managing personal finances. This API includes features such as user authentication with role-based access control, transaction management (income/expenses), category tracking, and secure profile image uploads.

## Features

- **User Authentication:** 
  - Register and login functionalities using JWT (JSON Web Tokens).
  - Passwords hashed via `bcryptjs`.
  - Roles: Admin and Regular User.
- **Transactions Management:** Create, read, update, and delete financial transactions (income and expenses).
- **Categories:** Manage specific categories for transactions.
- **Image Upload:** Secure profile picture uploads utilizing `multer` and `cloudinary`.
- **Security & Validation:**
  - `helmet` for securing HTTP headers.
  - `cors` for Cross-Origin Resource Sharing.
  - `express-rate-limit` to prevent brute-force attacks.
  - Request validation using `zod`.
- **API Documentation:** Integrated with `swagger-ui-express` and `swagger-jsdoc` for interactive API testing.

## Technologies Used

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Zod
- **Cloud Storage:** Cloudinary
- **Tools:** Nodemon, Morgan

## Prerequisites

- Node.js installed on your machine.
- A MongoDB cluster (Atlas) or local instance.
- A Cloudinary account for hosting images.

## Installation

1. **Clone the repository (if applicable) or download the files.**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI_dev=mongodb://127.0.0.1:27017/auth-ap
   MONGO_URI_PRO=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   *(Note: For production, use `MONGO_URI_PRO` instead of the local dev URI)*

## Running the Application

**Development Mode:**
Runs the app with `nodemon`, automatically restarting upon file changes.
```bash
npm run dev
```

**Production Mode:**
Runs the standard Node server.
```bash
npm start
```

## API Documentation

Once the server is running, you can access the interactive Swagger API documentation at:
```
http://localhost:3000/api-docs
```
*(Ensure you have setup your Swagger configuration route in your `src/index.js`)*

## Project Structure

```text
├── src/
│   ├── config/       # Database & Cloudinary configurations
│   ├── controllers/  # Request handling logic
│   ├── middlewares/  # Auth, validation, auth handlers
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints definitions
│   └── index.js      # Application entry point
├── .env              # Environment variables (ignored in Git)
├── package.json      # Project metadata and dependencies
└── README.md         # Project documentation
```

## Deployment

This app is ready to be deployed to platforms like **Render**, **Heroku**, or **Vercel**. 
When deploying, make sure to add your Environment Variables securely in your hosting provider's dashboard and do not commit your `.env` file.
