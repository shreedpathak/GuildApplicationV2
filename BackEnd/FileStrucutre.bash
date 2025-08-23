helper-app-backend/
│
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   │   └── jwt.js             # JWT configuration
│
│   ├── controllers/           # Handles request logic
│   │   ├── authController.js
│   │   ├── helperController.js
│   │   └── neederController.js
│
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   ├── HelperProfile.js
│   │   ├── ServiceRequest.js
│   │   ├── Payment.js
│   │   └── Rating.js
│
│   ├── routes/                # Express routes
│   │   ├── authRoutes.js
│   │   ├── helperRoutes.js
│   │   ├── neederRoutes.js
│   │   └── index.js           # Merge all routes
│
│   ├── middlewares/          # Middleware functions
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── roleCheck.js
│
│   ├── utils/                 # Utility functions
│   │   └── sendEmail.js
│   │   └── sendNotification.js
│
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point
│
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md

# Environment Variables, Please create a .env file in the root directory and delete the details from here after creating the file
# MONGO_URI: mongodb+srv://shreedpathaks:LwRhP52HqJ88y9bA@helper.ndrmo0l.mongodb.net/?retryWrites=true&w=majority&appName=Helper
# PORT: 3000
