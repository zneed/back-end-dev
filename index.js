const express = require("express");
const app = express();
const knex = require("./db/knex");
const PORT = 5000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routerV1 = require("./routes/v1/index");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(morgan("tiny"));
// parsing the request bodys
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// inisialisasi router
app.use("/v1/", routerV1);
app.listen(PORT, () => {
  knex
    .raw("select 1=1 as test")
    .then((result) => {
      console.log("DB CONNECTION: ", result.rows[0].test);
    })
    .catch((err) => {
      console.log("ERROR DB:", err);
    });
  console.log("Server started listening on PORT : " + PORT);
});
