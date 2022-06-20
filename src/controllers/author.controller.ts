import { Request } from 'express'
import Authors from '../models/author.model'
import { RestController } from './rest.controller'

interface iAuthor {
  name: string,
}

class Controller extends RestController {
  constructor(resource: string, model: any) {
    super(resource, model)
    this.populated = {
      index: [],
      show: [],
    }
  }

  allowedParams({ body }: Request) {
    const { name } = body

    return ({
      name
    }) as iAuthor
  }

}

const Author = new Controller('authors', Authors)
export { Author }
