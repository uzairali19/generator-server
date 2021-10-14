// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var dishRouter = require("./routes/dishRouter");
// var promoRouter = require("./routes/promoRouter");
// var leaderRouter = require("./routes/leaderRouter");

// var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/promotions", promoRouter);
// app.use("/dishes", dishRouter);
// app.use("/leaders", leaderRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbname = 'server';

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log('Connected successfully');

  const db = client.db(dbname);
  const collection = db.collection('dishes');

  collection.insertOne(
    {
      name: 'New Object',
      description: 'This is from the mongo client',
    },
    (err, result) => {
      assert.equal(err, null);
      console.log('After Insert \n');
      console.log(result);
      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log('Found: \n');
        console.log(docs);

        db.dropCollection('dishes', (err, result) => {
          assert.equal(err, null);
          console.log(result);
          client.close();
        });
      });
    }
  );
});
