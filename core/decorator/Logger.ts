import { Middleware } from 'koa'
import compose from 'koa-compose'

export function Logger (): MethodDecorator {
    return function (target, name, descriptor: TypedPropertyDescriptor<any>) {
        const origin = descriptor.value;

        const middleware: Middleware = async function (ctx, next) {
            console.log(`[${ctx.method}] -> ${ctx.path}`);
            const startTime = Date.now();
            await next();
            const endTime = Date.now();
            console.log(`[${ctx.status > 399 ? 'FAIL' : 'SUCCESS'}] ${ctx.status} <- ${ctx.path} ${endTime - startTime}ms`)
        }

        descriptor.value = compose([middleware, origin]);
    }
}