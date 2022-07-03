import { DefaultContext, Middleware } from "koa";
import compose from 'koa-compose'

export function CORS() {
  return function (target: any, name: string, descriptor: any) {
    const origin = descriptor.value;

    const cors: Middleware<DefaultContext> = async function (ctx, next) {
      await next();
      ctx.set("Access-Control-Allow-Origin", "*");
      ctx.set("Access-Control-Allow-Headers", "*");
      ctx.set("Access-Control-Methods", "*");
    };

    descriptor.value = compose([cors, origin])
  };
}
