import express from 'express';
import routes from './routes/index';
import db from './database'

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const PORT = process.env.PORT || 3000
const HOST: string = process.env.HOST || 'localhost'
const app = express()

app.use(express.json())

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname + '/assets'))

routes(app)


app.listen(
  PORT as number,
  HOST,
  () => console.log(`Server running at http://${HOST}:${PORT}`)
)
