const express = require("express");
const app = express();
const businessRoutes=require("./routes/businessRoutes")
const userRoutes = require("./routes/userRoutes");
const commentsRoutes = require('./routes/commentsRoutes');
const ratingRoutes=require('./routes/ratingRoutes')
// Middleware
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/rating",ratingRoutes)
app.use('/api/businesses', businessRoutes);
app.use('/api/comment', commentsRoutes);
// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send("Resource not found");
});
require('dotenv').config();


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
