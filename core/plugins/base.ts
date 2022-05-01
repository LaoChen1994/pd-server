import type App from '../base'

export interface IPluginBaseState {
    app: App
}

export default class PluginBase {
    app: IPluginBaseState['app']
    constructor(props: IPluginBaseState) {
        const { app } = props
        this.app = app;
    }

    load() {
        throw Error("插件load方法需要被重写")
    }
}

export const ignore = true;