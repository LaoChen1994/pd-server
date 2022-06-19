import { Middleware } from 'koa'

export function Logger () {
    return function (target: any, name: any, descriptor: any) {
        const fn = descriptor.value;
        const middleware: Middleware = async function (ctx, next) {
            console.log(`[${ctx.method}] -> ${ctx.path}`);
            await fn(ctx, next)
            console.log(`[${ctx.status > 399 ? 'FAIL' : 'SUCCESS'}] ${ctx.status} <- ${ctx.path}`)
        }

        descriptor.value = middleware;
    }
}