if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
};

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const path = require("path");
const app = express();

const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI,dbName: 'portfolio' }),
  })
);

app.use(flash());

// Routes
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);

// Error Pages
app.use((req, res) => {
  res.status(404).render("pages/404", { title: "404 Not Found" });
});


const PORT = 8080;  
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

