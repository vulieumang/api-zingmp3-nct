// Path
const path = require("path");

// Express
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// config cors
const corsOptions = {
  // origin: "https://music-player-pink.vercel.app/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Config app use
app.use(express.static(path.join(__dirname, "public"))); // set static file
app.set("views", path.join(__dirname, "views")); // set root dictionary view
app.set("view engine", "ejs"); // set template view engine use ejs

// ROUTE HOME
const homeRoute = require("./routers/home");
// app.use("/", cors(corsOptions), homeRoute);
app.use("/", homeRoute);


// API
const apiRoute = require("./routers/api/zing");
// app.use("/api", cors(corsOptions), apiRoute);
app.use("/api", apiRoute);

// Page Error
app.get("*", function (req, res) {
  res.send("nhap sai link roi ban oi !!!");
});

// Start server listen port 3000
app.listen(port, () => {
  console.log(`Start server listen at http://localhost:${port}`);
});
