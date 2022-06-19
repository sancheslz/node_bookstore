import { Request, Response } from "express";

const routes = [
  { 
    name: "books",
    description: "List of books",
    path: '/books',
    methods: [
      {
        verb: 'GET',
        path: '/books',
        goal: 'List all books',
      },
      {
        verb: 'GET',
        path: '/books/search',
        goal: 'Search books by Author',
      },
      {
        verb: 'POST',
        path: '/books',
        goal: 'Create a new book',
      },
      {
        verb: 'GET',
        path: '/books/:id',
        goal: 'Get a book by id',
      },
      {
        verb: 'PUT',
        path: '/books/:id',
        goal: 'Update a book by id',
      },
      {
        verb: 'DELETE',
        path: '/books/:id',
        goal: 'Delete a book by id',
      },
    ]
  },
  {
    name: "authors",
    description: "List of authors",
    path: '/authors',
    methods: [
      {
        verb: 'GET',
        path: '/authors',
        goal: 'List all authors',
      },
      {
        verb: 'POST',
        path: '/authors',
        goal: 'Create a new author',
      },
      {
        verb: 'GET',
        path: '/authors/:id',
        goal: 'Get an author by id',
      },
      {
        verb: 'PUT',
        path: '/authors/:id',
        goal: 'Update an author by id',
      },
      {
        verb: 'DELETE',
        path: '/authors/:id',
        goal: 'Delete an author by id',
      },
    ]
  },
]
class Controller {

  index(req: Request, res: Response) {
    res.render('root/home', { 
      title: 'Bookstore',
      routes: routes
    })
  }
}

const Root = new Controller()
export { Root }