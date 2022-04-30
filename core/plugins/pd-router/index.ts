import glob from "glob";
import path from "path";
import fs from "fs";
import Router from "koa-router";

import PluginBase, { IPluginBaseState } from "../base";
import { getRoutes } from "../../decorator/Controller";

interface IRouteProps {
  basePath?: string;
}

export default class RouterPlugin extends PluginBase {
  app: IPluginBaseState["app"];

  constructor(props: IPluginBaseState) {
    super(props);
    const { app } = props;
    this.app = app;
  }

  loadController() {
    const dirs = this?.app?.protoPaths ?? [];
    const app = this.app;
    return new Promise((res, rej) => {
      if (dirs.length) {
        dirs.forEach((dir) => {
          glob(
            "controller/*",
            {
              cwd: dir,
            },
            (err, matches) => {
              if (!err) {
                matches.forEach(async (controllerPath) => {
                  const filePath = path.join(dir, controllerPath);

                  if (!fs.statSync(filePath).isDirectory()) {
                    const Controller = await require(filePath);
                    if (typeof Controller === "function") {
                      new Controller(app);
                    } else {
                      if (typeof Controller.default === "function") {
                        new Controller.default(app);
                      } else {
                        rej("导出Controller方式异常");
                      }
                    }
                  }
                });

                res("ok");
              }
            }
          );
        });
      }
    });
  }

  initRouter() {
    const routes = getRoutes();
    const router = new Router();
    routes.forEach((route) => {
      const {
        constructor,
        method,
        url,
        key,
        handler = async (ctx, next) => {
          await next();
        },
        name = "",
      } = route;

      const prefix = (constructor.prefix || "").replace(/\W+(\/+)$/gi, "");
      const suffix = url.startsWith("/") ? url : `/${url}`;
      const path = `${prefix}${suffix}`;
      console.log(path)

      router[method](name, path, handler!);
    });

    this.app.app.use(router.routes()).use(router.allowedMethods());
  }

  async load() {
    await this.loadController();
    this.initRouter();
  }
}
