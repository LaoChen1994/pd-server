# pd-server

## 简介

基于 koa 封装的简洁可用装饰器风格的 nodejs server

## 简单用法

### router

**注意**：由于 router 其本质是上报路由信息，所以需要卸载装饰器的第一位，所有在其之前加载的装饰器会出现失效的问题

```typescript
import { BaseController, Controller, RequestMapping, cors } from "pd-server";

@Controller("/test")
class TestController extends BaseController {
  constructor(props: any) {
    super(props);
  }

  @RequestMapping({
    url: "/v2",
    method: "get",
  })
  @cors()
  async test2(ctx: any, next: any) {
    ctx.body = {
      code: 0,
      message: "success",
    };
  }
}

export default TestController;
```

### CORS 与 Logger

```typescript
@Controller("/test")
class TestController extends BaseController {
  constructor(props: any) {
    super(props);
  }

  @RequestMapping({
    url: "/v2",
    method: "get",
  })
  @Logger()
  @CORS()
  async test2(ctx: any, next: any) {
    ctx.success("success");
  }
}
```

### app 启动

```typescript
import { BaseServer } from "pd-server";

new BaseServer({
  basePath: __dirname,
}).start(3000);
```
