
const express = require("express");

const app = express();
const PORT = 3000;

// Log each request and its status code
app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(`${req.method} ${req.path} - ${res.statusCode}`);
    });
    next();
});

// GET /
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my Node.js and Express server!");
});

// GET /about
app.get("/about", (req, res) => {
    res.status(200).json({
        name: "Valluri Ravi Teja",
        registrationNumber: "252U1R9166",
        section: "CSE GEN-AI 2C"
    });
});

// GET /time
app.get("/time", (req, res) => {
    res.status(200).json({
        currentDateTime: new Date()
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});
