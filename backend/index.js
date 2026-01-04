require("dotenv").config();
const express = require("express");
const cors = require("cors");

const initDb = require("./seed/initdb");
const errorHandler = require("./utill/errorhandler");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/categories", require("./routes/categroy.route"));
app.use("/api/expenses", require("./routes/expense.routes"));
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});
app.use(errorHandler);
const startServer = async () => {
  await initDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
