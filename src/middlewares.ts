import { ParameterizedContext, Middleware, Next } from "koa";
import { State } from "./types";

export function removeMetadata(): Middleware<State> {
  return async (ctx: ParameterizedContext<State>, next: Next) => {
    await next()

    if (ctx.body) {
      ctx.body = JSON.parse(JSON.stringify(ctx.body, (k, v) => (k === '_id' || k === '__v') ? undefined : v))
    }
  }
}
