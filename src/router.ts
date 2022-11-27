import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './consts/http_methods';
import { plainTextParser, xmlParser, jsonParser } from './utilities/parser';

type RequestHandler = (
  req: VercelRequest,
  res: VercelResponse,
  payload: Object,
) => void | Promise<void>;

const contentTypes: { [key: string]: any } = {
  'text/html': (text: string): Object => plainTextParser(text),
  'application/xml': (xml: string): Object => xmlParser(xml),
  'application/json': (json: string): Object => jsonParser(json),
  'application/x-www-form-urlencoded': (data: string): Object =>
    Object.fromEntries(new URLSearchParams(data)),
};

export class Router {
  private routes: {
    [route: string]: { [method: string]: RequestHandler[] };
  } = {};
  private baseRoute: string;

  constructor(route: string) {
    this.baseRoute = route;
  }

  private use(method: string, route: string, ...handlers: RequestHandler[]) {
    if (!handlers.length) {
      throw new Error('You did not assign any handlers!');
    }

    const fullRoute = this.baseRoute.concat(route);

    if (!this.routes[fullRoute]?.[method]) {
      const existingHandlers = this.routes[fullRoute] || {};
      this.routes[fullRoute] = { ...existingHandlers, [method]: handlers };
    } else {
      this.routes[fullRoute][method] = handlers;
    }
  }

  public async handle(req: VercelRequest, res: VercelResponse) {
    const { url, method } = req;

    if (!url) {
      throw new Error('You did not specify url!');
    }
    if (!method) {
      throw new Error('Invalid method on given request!');
    }

    let payload = {},
      rawRequest = '';
    for await (const chunk of req) {
      rawRequest += chunk;
    }

    const handlers = this.routes[url][method];

    if (!handlers) throw new Error('You did not assign any handlers!');

    if (req.headers['content-type']) {
      const contentType: string = req.headers['content-type'].split(';')[0];
      if (contentTypes[contentType]) {
        payload = contentTypes[contentType](rawRequest);
      }
    }

    for (const handler of handlers) {
      await handler(req, res, payload);
    }

    res.status(200).end();
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
