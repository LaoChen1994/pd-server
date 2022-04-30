import PluginBase, { IPluginBaseState } from "../base";
import glob from "glob";
import path from "path";
import fs from "fs";

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

  load() {
    const dirs = this?.app?.protoPaths ?? [];
    const app = this.app
    if (dirs.length) {
      dirs.forEach((dir) => {
        glob(
          "controller/*",
          {
            cwd: dir,
          },
          (err, matches) => {
            if (!err) {
              matches.map(async path => {
                  if (!fs.statSync(path).isDirectory()) {
                      const Controller = await require(path);
                      new Controller(app)
                  }
              })
            }
          }
        );
      });
    }
  }
}
