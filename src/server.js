import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productsRouter from "./services/products/index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
server.use(cors());
server.use(express.json());

// ROUTES
server.use("/products", productsRouter);

// MONGO CONNECTION
mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoose");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});

// MONGO CONNECTION ERROR
mongoose.connection.on("error", (err) => {
  console.log(err);
});
