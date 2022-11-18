import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './consts/http_methods';

type RequestHandler = (
  req: VercelRequest,
  res: VercelResponse,
) => void | Promise<void>;

export class Router {
  private routes: {
    [route: string]: { [method: string]: RequestHandler[] };
  } = {};
  private baseRoute: string;

  constructor(route: string) {
    this.baseRoute = route;
  }

  private use(
    method: HTTPMethod,
    route: string,
    ...handlers: RequestHandler[]
  ) {
    if (handlers.length === 0) { throw new Error('You did not assign any handlers!'); }

    const fullRoute = this.baseRoute.concat(route);

    if (this.routes[fullRoute]?.[method] === null) {
      const existingHandlers = this.routes[fullRoute] || {};
      this.routes[fullRoute] = { ...existingHandlers, [method]: handlers };
    } else {
      this.routes[fullRoute][method] = handlers;
    }
  }

  public async handle(req: VercelRequest, res: VercelResponse) {
    const { url, method } = req;
    const handlers = this.routes[url as string][method as string];

    if (handlers === null) throw new Error('You did not assign any handlers!');

    for (const handler of handlers) {
      await handler(req, res);
    }

    res.status(200).send('Request handled!');
  }

  public get(route: string, ...handlers: RequestHandler[]) {
    this.use(HTTPMethod.GET, route, ...handlers);
  }

  public post(route: string, ...handlers: RequestHandler[]) {
    this.use(HTTPMethod.POST, route, ...handlers);
  }

  public put(route: string, ...handlers: RequestHandler[]) {
    this.use(HTTPMethod.PUT, route, ...handlers);
  }

  public delete(route: string, ...handlers: RequestHandler[]) {
    this.use(HTTPMethod.DELETE, route, ...handlers);
  }
}
