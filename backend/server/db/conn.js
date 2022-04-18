const mongoose = require('mongoose')

DB = process.env.DB;
const conn=mongoose
  .connect(DB, {
  })

  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
