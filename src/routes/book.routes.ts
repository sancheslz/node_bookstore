import { Express } from 'express'
import { Book } from "../controllers/book.controller";

const book = (app: Express) => {
  app.get('/books', Book.index)
  app.get('/books/search', Book.search)
  app.post('/books', Book.create)
  app.get('/books/:id', Book.show)
  app.put('/books/:id', Book.update)
  app.delete('/books/:id', Book.delete)
}


export { book }
