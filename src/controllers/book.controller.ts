import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Books from '../models/book.model'

interface iBook {
  id: string,
  title: string,
  author: string
}

class Book {

  static async index(req: Request, res: Response) {
    try {
      const result = await Books.find().populate('author', 'name').exec()
      if (result.length > 0) return res.status(200).send({ message: 'success', data: result })
      res.status(200).send({ message: 'success', data: 'Nothing to show' })
    }
    catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong' })
    }
  }

  static async create(req: Request, res: Response) {
    const book = Book.allowedParams(req)
    book.id = uuid()
    try {
      const result = await Books.create(book)
      res.status(201).send({ message: 'success', data: result.id })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await Books.findOne({ id: id }).populate('author', ['name']).exec()
      if (result) return res.status(200).send({ message: 'success', data: result })
      res.status(404).send({ message: 'Not found', data: `Id ${id} was not founded` })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }

  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const book = Book.allowedParams(req)
    try {
      const result = await Books.findOneAndUpdate({ id: id }, book, { new: true })
      if (result) return res.status(200).send({ message: 'success', data: result })
      res.status(404).send({ message: 'Not found', data: `Id ${id} was not founded` })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await Books.findOneAndDelete({ id: id })
      if (result) return res.status(200).send({ message: 'success', data: `Id ${id} was deleted` })
      res.status(404).send({ message: 'Not found' })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  static async search(req: Request, res: Response) {
    const { id } = req.params
    const query = req.query.author
    try {
      const result = await Books.find({'authors': {"$regex": query}}, {}).exec()
      res.status(200).send({ message: 'success', data: result })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  private static allowedParams({ body }: Request) {
    const { title, author } = body

    return ({
      title, author
    }) as iBook
  }

}

export { Book }
