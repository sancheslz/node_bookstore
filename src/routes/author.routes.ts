import { Express } from 'express'
import { Author } from "../controllers/author.controller";

const author = (app: Express) => {
  app.get('/authors', Author.index)
  app.post('/authors', Author.create)
  app.get('/authors/:id', Author.show)
  app.put('/authors/:id', Author.update)
  app.delete('/authors/:id', Author.delete)
}


export { author }
