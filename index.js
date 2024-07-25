import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import callToSocket from "./socket.js";
import { generateAndStoreUniqueCodes } from "./uniqueCodesGenerator.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// generateAndStoreUniqueCodes()


// ROUTE IMPORTS

// ERROR MIDDLEWARE -> customErrorHandler
// const PortfolioRoutes = require("./routes/portfolio");
import PortfolioRoutes from "./routes/portfolio.js";
import userRoutes from "./routes/codeRoutes.js";

// const codeRoutes = require("./routes/codeRoutes.js");

app.use("/portfolios", PortfolioRoutes);
app.use("/api/v1", userRoutes);
// app.use("/api/v1", codeRoutes);

const PORT = process.env.PORT || 5000;

// Pl6RlYBH4bnMDcp1

const uri  = "mongodb+srv://mulchandanilakshman:Pl6RlYBH4bnMDcp1@cluster0.vhlqt85.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(
  uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  // .then(() => app.listen(PORT, () => console.log("listening on port " + PORT)))
  .then(() => console.log("Mongodb connected successfully"))
  .catch((issues) => console.log("issues " + issues));

// socket

const server = http.createServer(app);


// calling to socket

callToSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


