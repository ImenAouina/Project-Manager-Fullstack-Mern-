const express = require("express")
const app = express()
const cors = require("cors")
require("./config/mongoose.config")
const cookieParser = require('cookie-parser');
require("dotenv").config()

const passport = require('passport');
const port = process.env.PORT

app.use(cors({credentials: true,origin: "http://localhost:3000"}),
express.json(),
express.urlencoded({extended:true}),
cookieParser(),
);

const userRoutes = require('./routes/user.routes')
userRoutes(app)

app.listen(port, () => {
    console.log(`🎈🎈🎈 Server is running on Port ${port} 🎈🎈🎈`)
})