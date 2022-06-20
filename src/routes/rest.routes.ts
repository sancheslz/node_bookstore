import { Express } from 'express';

interface iHttpMethods {
  method: string | any,
  verb: string,
  collection: boolean,
}

class RestRouter {

  httpMethods: iHttpMethods[] = [
    { method: 'index', verb: 'get', collection: true },
    { method: 'show', verb: 'get', collection: false },
    { method: 'create', verb: 'post', collection: true },
    { method: 'update', verb: 'put', collection: false },
    { method: 'delete', verb: 'delete', collection: false },
  ]

  constructor(
    private app: Express,
    private resource: string,
    private controller: any,
    private endpoints: string[] | string
  ) {
    this.app = app;
    this.resource = resource;
    this.controller = controller;
    this.endpoints = endpoints;
  }

  build() {
    if (typeof this.endpoints === 'string' && this.endpoints === '__all__') {
      this.httpMethods.forEach(endpoint => {
        const uri = endpoint.collection ? `/${this.resource}` : `/${this.resource}/:id`;
        this.app[endpoint.verb as keyof Express](uri, this.controller[endpoint.method])
      })
    } else {
      this.httpMethods.forEach(endpoint => {
        this.endpoints.includes(endpoint.method) && this.app[endpoint.verb as keyof Express](`/${this.resource}`, this.controller[endpoint.method])
      })
    }
    return this.app
  }
}

export { RestRouter };
