import { Middleware, DefaultState, DefaultContext } from "koa";
import PluginBase, { IPluginBaseState } from "../base";

export interface IResponseCtx extends DefaultContext {
  success: <T = any>(data: T) => void;
  fail: (code: number, msg: string) => void;
  r: (code: number, data: any) => void;
}

export default class PdResponse extends PluginBase {
  constructor(props: IPluginBaseState) {
    super(props);
  }

  createMiddlare(): void | Middleware<DefaultState, IResponseCtx, any> {
    return async (ctx, next) => {
      ctx.r = (code, data) => {
        ctx.header["accept-language"] = "application/json";
        ctx.status = code;
        ctx.body = data;
      };

      ctx.fail = (code, msg) => {
        ctx.message = msg;
        ctx.status = code;
      };

      ctx.success = (body) => {
        ctx.message = "ok";
        ctx.r(200, body);
      };

      await next()
    };
  }

  load() {
    this.app.app.use(this.createMiddlare()!)
  }
}
