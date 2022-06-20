import { Request, Response } from 'express'
import Books from '../models/book.model'
import { RestController } from './rest.controller'

interface iBook {
  title: string,
  author: string
}

class Controller extends RestController {
  constructor(resource: string, model: any) {
    super(resource, model)
    this.search = this.search.bind(this)
    this.populated = {
      index: ['author', 'name'],
      show: ['author', 'name'],
    }
  }

  allowedParams({ body }: Request) {
    const { title, author } = body

    return ({
      title, author
    }) as iBook
  }

  async search(req: Request, res: Response) {
    try {
      const query = req.query.author
      const result = await this.model.find({ 'author': query }).populate('author', 'name').exec()
      res.status(200).send({ message: 'success', data: result })
    } catch (err) {
      res.status(404).send({ message: 'Not founded' })
    }
  }

  test(req: Request, res: Response) {
    res.send('test')
  }
}

const Book = new Controller('books', Books)

export { Book }
