import Koa from "koa";
import path from "path";
import glob from "glob";
import fs from "fs";

interface IAppProps {
  basePath?: string;
}

interface IAppConfig {}

export default class App {
  app: Koa;
  path: string;
  basePath: string;
  public protoPaths: string[] = [];

  constructor(props: IAppProps) {
    this.app = new Koa();
    this.path = props.basePath || path.resolve(".");
    this.basePath = __dirname;
  }

  public get frameworkPaths() {
    const path = [];
    if (this.path && this.path === this.basePath) {
      return [this.path];
    } else {
      this.path && path.push(this.path);
      this.basePath && path.push(this.basePath);
    }

    return path;
  }

  private _collectPath() {
    if (this.protoPaths.length) {
      return this.protoPaths;
    }

    let proto = this;
    while (proto !== null) {
      if (proto?.frameworkPaths && proto?.frameworkPaths?.length) {
        this.protoPaths.push(...proto.frameworkPaths);
      }
      // @ts-ignore
      proto = proto.__proto__;
    }
  }

  init() {
    this._collectPath();
    this.initPlugin();
  }

  initPlugin() {
    const app = this;

    this.protoPaths.map((basePath) => {
      // @todo 这里可以抽一个单独的方法出来做这个事情
      glob(
        "plugins/**",
        {
          cwd: basePath,
        },
        (err, matches) => {
          if (!err) {
            matches.forEach(async (item) => {
              const filePath = path.resolve(basePath, item);
              if (!fs.statSync(filePath).isDirectory()) {
                const plugin = await require(filePath);

                // @todo 这里后期可以通过配置ignore的方式来操作
                if (!plugin.ignore) {
                  new plugin.default({ app }).load();
                }
              }
            });
          }
        }
      );
    });
  }

  async start() {
    await this.init();
  }

  use() {}
}
