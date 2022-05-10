const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

//regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookies and file middleware
app.use(cookieParser())
app.use(fileUpload())

//morgan middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//import all routes here
const home = require('./routes/home')
const user = require('./routes/user')

//router middleware
app.use('/api/v1', home)
app.use('/api/v1', user)

//export app js
module.exports = app