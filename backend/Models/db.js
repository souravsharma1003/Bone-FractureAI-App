const mongoose=require('mongoose');

const mongo_url=process.env.MONGO_CONN;

mongoose.connect(mongo_url);
const db=mongoose.connection;
db.on("error",(err)=>console.log("Error connecting to the database:",err))
.once("open",()=>console.log("Database connected successfully...."));


