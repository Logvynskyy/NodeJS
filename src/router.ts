import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './consts/http_methods';

export class Router {
  private routes: { [route: string]: { [method: string]: Function } } = {};
  private baseRoute: string;

  constructor(route: string) {
    this.baseRoute = route;
  }

  private use(method: HTTPMethod, route: string, handler: Function) {
    if (handler.length === 0) throw new Error('Handlers must be implemented');

    const fullRoute = this.baseRoute.concat(route);
    this.routes[fullRoute] = { method: handler };
  }

  public handle(req: VercelRequest, res: VercelResponse) {
    const { url, method } = req;
    const handler = this.routes;
    if (handler === null) throw new Error('Handlers are not implemented');

    res.send({ req });
  }

  public get(route: string, handler: Function) {
    this.use(HTTPMethod.GET, route, handler);
  }

  public post(route: string, handler: Function) {
    this.use(HTTPMethod.POST, route, handler);
  }

  public put(route: string, handler: Function) {
    this.use(HTTPMethod.PUT, route, handler);
  }

  public delete(route: string, handler: Function) {
    this.use(HTTPMethod.DELETE, route, handler);
  }

  public patch(route: string, handler: Function) {
    this.use(HTTPMethod.PATCH, route, handler);
  }

  public head(route: string, handler: Function) {
    this.use(HTTPMethod.HEAD, route, handler);
  }

  public options(route: string, handler: Function) {
    this.use(HTTPMethod.OPTIONS, route, handler);
  }

  public connect(route: string, handler: Function) {
    this.use(HTTPMethod.CONNECT, route, handler);
  }

  public trace(route: string, handler: Function) {
    this.use(HTTPMethod.TRACE, route, handler);
  }
}
