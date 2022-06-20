import { Express } from 'express';
import { Author } from "../controllers/author.controller";
import { RestRouter } from './rest.routes';


const author = (app: Express) => {
  new RestRouter(app, 'authors', Author, '__all__').build();
}


export { author };
