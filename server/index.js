//  позволяет тянуть информацию из файла ".env", (process.env.PORT)
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')

const PORT = process.env.PORT || 5000
const app = express()

const start = async () => {
    try {
        app.listen(PORT,() => console.log(`Srever started on PORT -> http://localhost:${PORT}/`))
    } catch (e) {
        console.log(e)
    }
}

start()