// server.js

import { app } from "./index.js";
import { connectDB } from "./data/database.js"; // Replace with your database connection function

connectDB(); // Connect to MongoDB database

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
