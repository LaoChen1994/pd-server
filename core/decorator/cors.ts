import { Middleware } from "koa";

export function cors() {
  return function (target: any, name: string, descriptor: any) {
    const fn: Function = descriptor.value;

    const cors: Middleware = async function (this: any, ctx, next) {
      await fn.call(this, ctx, next)
      ctx.set("Access-Control-Allow-Origin", "*");
      ctx.set("Access-Control-Allow-Headers", "*");
      ctx.set("Access-Control-Methods", "*");
    };

    descriptor.value = cors
  };
}
