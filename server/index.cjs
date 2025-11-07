const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const userRoutes = require("./routes/userRoutes.cjs");
const aboutRoutes = require("./routes/aboutRoutes.cjs");
const postRoutes = require("./routes/postRoutes.cjs");
const videoRoutes = require("./routes/VideoRoutes.cjs");

const app = express();

/* ------------------------------
   ✅ MIDDLEWARE
------------------------------ */

// Allow requests from your frontend (React app)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://manishasrivastav-production.up.railway.app","https://manisha-srivastav.vercel.app"], // allowed origins // change to your production domain later
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Simple logger (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ------------------------------
   ✅ DATABASE CONNECTION
------------------------------ */

mongoose
  .connect(
    "mongodb://mongo:KkjnaqfidQVXSyzObzvgwcfPqjhzisya@maglev.proxy.rlwy.net:27728/portfolio?authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

/* ------------------------------
   ✅ ROUTES
------------------------------ */

app.use("/api/users", userRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/hero", require("./routes/heroRoutes.cjs"));
app.use("/api/my-activity", require("./routes/myActivityRotes.cjs"));
/* ------------------------------
   ✅ SERVER START
------------------------------ */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

