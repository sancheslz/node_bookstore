import { Express } from 'express'
import { Root } from "../controllers/root.controller";

const root = (app: Express) => {
  app.get('/', Root.index)
}

export { root }
