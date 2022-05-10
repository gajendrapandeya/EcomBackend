const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT, () => console.log(`🚀 server running at port ${process.env.PORT}`))