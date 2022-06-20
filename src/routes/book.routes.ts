import { Express } from 'express';
import { Book } from "../controllers/book.controller";
import { RestRouter } from './rest.routes';


const book = (app: Express) => {
  new RestRouter(app, 'books', Book, '__all__').build();
  app.get('/books/search', Book.search)
}

export { book };

