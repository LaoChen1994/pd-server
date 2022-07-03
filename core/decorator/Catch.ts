import { Middleware } from "koa";

export function Catch() {
  return function (target: any, name: string, descriptor: any) {
    const fn: Function = descriptor.value;

    const fail: Middleware = async function (this: any, ctx, next) {
        try {
            await fn.call(this, ctx, next)
        } catch (error) {
            let msg = error
            if (error instanceof Error) {
                msg = error.message
                console.log(error)
            }

            ctx.state = 500;
            ctx.body = `服务器异常 ${msg}`
        }
    };

    descriptor.value = fail
  };
}
