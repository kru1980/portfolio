const express = require("express");
const next = require("next");
const routes = require("../routes"); // next routes
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const db = require("./config/db");
const config = require("./config/config");

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

// подкл базы
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("db connected..");
  })
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

// secret data
const secretData = [
  { title: "secret1", descriptions: "секретный данные 1" },
  { title: "secret2", descriptions: "секретный данные 2" }
];
// service
const authService = require("./services/auth");

// server next
app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false })); // тк через  axios то false
  server.use(bodyParser.json());

  // хранилище секретных данных
  server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
    return res.json(secretData);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // catch 404 and forward to error handler
  server.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("error", {
      message: error.message,
      error: !config.IS_PRODUCTION ? error : {}
    });
  });

  server.use(handle).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
