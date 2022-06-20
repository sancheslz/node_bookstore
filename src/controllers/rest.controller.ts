import { Request, Response } from 'express'

interface iPopulated {
  index: string[]
  show: string[]
}

class RestController {
  resource: string
  model: any
  populated: iPopulated = {
    index: [],
    show: [],
  }

  constructor(resource: string = 'spam', model: any) {
    this.resource = resource
    this.model = model

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  allowedParams({ body }: Request): any {
    throw new Error('Method not implemented.')
  }

  async index(req: Request, res: Response) {
    try {
      const populated = this.populated.index
      const result = await this.model.find().populate(...populated).exec()
      if (result.length > 0) return res.status(200).send({ message: 'success', data: result })
      res.status(200).send({ message: 'success', data: 'Nothing to show' })
    }
    catch (err) {
      res.status(500).send({ message: 'Something went wrong' })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params
      const populated = this.populated.index
      const result = await this.model.findOne({ id: id }).populate(...populated).exec()
      if (result) return res.status(200).send({ message: 'success', data: result })
      res.status(404).send({ message: 'Not found', data: `Id ${id} was not founded` })
    }
    catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const content = this.allowedParams(req)
      const result = await this.model.create(content)
      res.status(201).send({ message: 'success', data: result.id })
    }
    catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const content = this.allowedParams(req)
      const result = await this.model.findOneAndUpdate({ id: id }, content, { new: true })
      if (result) return res.status(200).send({ message: 'success', data: result })
      res.status(404).send({ message: 'Not found', data: `Id ${id} was not founded` })
    }
    catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await this.model.findOneAndDelete({ id: id })
      if (result) return res.status(200).send({ message: 'success', data: `Id ${id} was deleted` })
      res.status(404).send({ message: 'Not found' })
    }
    catch (err) {
      res.status(500).send({ message: 'Error' })
    }
  }

}

export { RestController }
