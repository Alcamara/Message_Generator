const express = require("express");
const bodyParser = require("body-parser");
const FormRouter = require("./routes/form.router");
const PORT = 5000;

const app = express();

app.use(bodyParser.json());
app.use(express.static("build"));

//routes
app.use("/api", FormRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
