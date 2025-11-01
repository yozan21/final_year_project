import mongoose from "mongoose";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:💥", err.name, ",", err.message);
  console.error("Shutting down...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const { default: app } = await import("./app.js");

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const port = process.env.PORT || 3000;
let server;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
    server = app.listen(port, () => {
      console.log(`Server has started on port:${port}`);
    });
  })
  .catch((err) => console.error("Error connecting database:" + err));

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.name, ",", err.message);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Sutting down gracefully.");
  server.close(() => {
    console.log("Process terminated");
  });
});
