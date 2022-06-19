import type App from "../base";
import { Middleware, DefaultState } from "koa";
import { IBaseContext } from '../typings'

export interface IPluginBaseState {
  app: App;
}

export default class PluginBase {
  app: IPluginBaseState["app"];
  constructor(props: IPluginBaseState) {
    const { app } = props;
    this.app = app;
  }

  createMiddlare(): void | Middleware<DefaultState, IBaseContext, any> {}

  load() {
    throw Error("插件load方法需要被重写");
  }
}

export const ignore = true;
