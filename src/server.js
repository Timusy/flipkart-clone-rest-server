const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");
const env=require("dotenv");
const path=require("path");
const cors=require("cors");

//importing user route from routes folder
const userRoutes=require("./routes/user");
const adminRoutes=require("./routes/admin/user");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const cartRoutes=require("./routes/cart");
const initialDataRoutes=require("./routes/admin/initialdata");
const pageRoutes=require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

const app = express();
env.config();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.7ghq7.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex:true}).then(()=>{console.log("Database connected")});

  app.use("/public",express.static(path.join(__dirname,'uploads')));
  app.use('/api',userRoutes);
   //every route will be prefixed with api and call to userRoutes is made
  app.use('/api',adminRoutes);
  app.use("/api",categoryRoutes);
  app.use("/api",productRoutes);
  app.use("/api",cartRoutes);
  app.use("/api",initialDataRoutes);
  app.use("/api",pageRoutes);
  app.use("/api", addressRoutes);
  app.use("/api", orderRoutes);
  app.use("/api", adminOrderRoute);






//Used backtick for converting string to json i.e interpolation of string
app.listen(process.env.PORT, function() {
  console.log(`Server started on port ${process.env.port}`);
});
