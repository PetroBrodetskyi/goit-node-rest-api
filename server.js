import mongoose from "mongoose";
import app from "./app.js"

mongoose.Promise = global.Promise;

const { DB_HOST } = process.env;

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(3000);
        console.log("Server started on port 3000");
        console.log("Database connection successful");
    })
    .catch(error => {
        console.log("Database connection error:", error.message);
        process.exit(1);
    });