const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }    
)
.then(() => {
    console.log("Connected To Database Successfully");
})
.catch((err) => {
    console.log(`Database Connection Error: ${err.message}`)
}); 

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening to PORT ${process.env.PORT}`)
});
