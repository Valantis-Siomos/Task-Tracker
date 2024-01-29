const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const taskRoutes = require("./routers/routers");

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
