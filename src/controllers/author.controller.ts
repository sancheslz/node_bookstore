import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import Authors from '../models/author.model'

interface iAuthor {
  id: string,
  name: string,
}

class Author {

  static async index(req: Request, res: Response) {
    try {
      const result = await Authors.find()
      if (result.length > 0) return res.status(200).send({ message: 'success', data: result })
      res.status(200).send({ message: 'success', data: 'Nothing to show' })
    }
    catch (err) {
      res.status(500).send({ message: 'Something went wrong' })
    }
  }

  static async create(req: Request, res: Response) {
    const author = Author.allowedParams(req)
    author.id = uuid()
    try {
      const result = await Authors.create(author)
      res.status(201).send({ message: 'success', data: result.id })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await Authors.findOne({ id: id })
      if (result) return res.status(200).send({ message: 'success', data: result })
      res.status(404).send({ message: 'Not found', data: `Id ${id} was not founded` })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }

  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const author = Author.allowedParams(req)
    try {
      const result = await Authors.findOneAndUpdate({ id: id }, author, { new: true })
      if (result) return res.status(200).send({ message: 'success', data: result })
      res.status(404).send({ message: 'Not found', data: `Id ${id} was not founded` })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await Authors.findOneAndDelete({ id: id })
      if (result) return res.status(200).send({ message: 'success', data: `Id ${id} was deleted` })
      res.status(404).send({ message: 'Not found' })
    } catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  private static allowedParams({ body }: Request) {
    const { name } = body

    return ({
      name
    }) as iAuthor
  }

}

export { Author }
