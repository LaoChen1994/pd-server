import Koa from "koa";
import path from "path";
import glob, { IOptions } from "glob";
import fs from "fs";

interface IAppProps {
  basePath?: string;
}

const PLUGIN_PARTTEN = "plugins/**";
const CONFIG_PARTTEN = "config/**";
export default class App {
  app: Koa;
  path: string;
  basePath: string;
  config: Record<string, any>;
  public protoPaths: string[] = [];

  constructor(props: IAppProps) {
    this.app = new Koa();
    this.path = props.basePath || path.resolve(".");
    this.basePath = __dirname;
    this.config = {};
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

  #_collectPath() {
    if (this.protoPaths.length) {
      return this.protoPaths;
    }

    let proto = this;
    while (proto !== null) {
      if (proto?.frameworkPaths && proto?.frameworkPaths?.length) {
        this.protoPaths.unshift(...proto.frameworkPaths);
      }
      // @ts-ignore
      proto = proto.__proto__;
    }
  }

  async init() {
    this.#_collectPath();
    await this.#initConfig();
    await this.#initPlugin();
  }

  async #initConfig() {
    let i = this.protoPaths.length - 1;
    while (i >= 0) {
      const files = await this.#_globalFiles(CONFIG_PARTTEN, {
        cwd: this.protoPaths[i],
      });
      for (let j = 0; j < files.length; j++) {
        const realPath = path.resolve(this.protoPaths[i], files[j]);
        const state = fs.statSync(realPath);
        if (
          !state.isDirectory() &&
          [".ts", ".js"].includes(path.extname(realPath))
        ) {
          const config = require(realPath);
          const filename = path.basename(realPath).split(".")[0];
          this.config[filename] = config.default;
        }
      }
      i--;
    }
  }

  async #initPlugin() {
    const app = this;
    const { plugin: pluginConfig = {} } = this.config;
    try {
      const matchCollection = await Promise.all(
        this.protoPaths.map((basePath) =>
          this.#_globalFiles(PLUGIN_PARTTEN, { cwd: basePath })
        )
      );

      await Promise.all(
        matchCollection.reduce((p, matches, i) => {
          matches.forEach(async (item) => {
            const filePath = path.resolve(this.protoPaths[i], item);
            let pluginName = path.basename(item).split(".")[0];

            if (pluginName === "index") {
              pluginName = path.dirname(item).split("/").at(-1)!;
            }
            if (!pluginConfig[pluginName] || !pluginConfig[pluginName].enabled)
              return p;

            if (!fs.statSync(filePath).isDirectory()) {
              const { default: Plugin } = require(filePath);

              p.push(new Plugin({ app }).load());
            }
          });

          return p;
        }, [] as any[])
      );
    } catch (error) {
      console.log(error);
    }
  }

  #_globalFiles(partten: string, opt: IOptions) {
    return new Promise<string[]>((res, rej) => {
      glob(partten, opt, (err, matches) => {
        if (err) {
          rej(err);
          return;
        }

        res(matches);
      });
    });
  }

  async start(...args: any) {
    await this.init();
    const [port] = args;
    if (port) {
      console.log("server is on", port);
    }
    this.app.listen(...args);
  }
}
