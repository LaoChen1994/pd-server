import type App from '../base'

export interface IPluginBaseState {
    app: App
}

export default abstract class PluginBase {
    constructor(props: IPluginBaseState) {
    }

    load() {
        throw Error("插件load方法需要被重写")
    }
}

export const ignore = true;