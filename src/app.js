import express from 'express';

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const app = express()


app.listen(
  PORT,
  HOST,
  () => console.log(`Server running at http://${HOST}:${PORT}`)
)