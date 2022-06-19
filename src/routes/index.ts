import { Express } from "express";
import { author } from "./author.routes";
import { book } from "./book.routes";
import { root } from "./root.routes"

const routes = (app: Express) => {
  book(app)
  author(app)
  root(app)
}

export default routes;
