# pd-server

## 简介

基于koa封装的简洁可用装饰器风格的nodejs server

## 简单用法

### router

```typescript
import { BaseController, Controller, RequestMapping, cors } from 'pd-server'

@Controller("/test")
class TestController extends BaseController {
    constructor(props: any) {
        super(props)
    }

    @RequestMapping({
        url: '/v2',
        method: "get"
    })
    @cors()
    async test2(ctx: any, next: any) {
        ctx.body = {
            code: 0,
            message: "success"
        }
    }
}

export default TestController

```

### app启动

```typescript
import { BaseServer } from 'pd-server'

new BaseServer({
  basePath: __dirname
}).start(3000)
```