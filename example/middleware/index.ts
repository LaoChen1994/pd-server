const Logger =  (targert: any, name: string, descriptor: any) => {
  const original = descriptor.value;
  if (typeof original === 'function') {
      descriptor.value = async function(...args: any[]) {
          const [ctx, next] = args;
          const { method, url } = ctx.request || {}

          console.log(`[${method}] ${url} ->`)
          await original.apply(this, args)
          console.log(`[${ctx.response.status}] ${url} <-`)
      }
  }  
}

function CORS() {
    return function (target: any, name: string, descriptor: any) {
        const originValue = descriptor.value
        const corsMiddlware = async function(this: any, ...args: any[]) {
            if (typeof originValue === 'function') {
                await originValue.apply(this, args)

                const ctx = args[0];

                ctx.set('access-control-allow-headers', "*")
                ctx.set('access-control-allow-methods', "*")
                ctx.set('access-control-allow-origin', "*")
                ctx.set('access-control-max-age', 3600)
            }
        }
        descriptor.value = corsMiddlware
    }
}

export {
    Logger,
    CORS
}