const express = require("express");
const dotenv = require("dotenv").config();
const rateLimit = require("express-rate-limit");

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use(cors());

const apiRouter = require("./public/router/apiRouter");

const port = process.env.PORT || 3000;

// parse application/json
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});

app.use(apiLimiter);

app.use("/api/v1", apiRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
