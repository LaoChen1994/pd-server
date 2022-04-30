export interface IRouteController {
    prefix?: string
    [key: string]: any
}

export interface IRequestMapping {
    method: "GET" | "POST" | "PUT" | "DELETE" | "OPTION" | "PATCH";
    url: string;
}

export interface IAppRoute extends IRequestMapping {
    controller: IRouteController;
    key: string
}

export const routers: IAppRoute[] = [];

export function Controller(path = "") {
    return function (target: any) {
        target.prefix = path
    }
}

export function RequestMapping(props: IRequestMapping) {
    return function (target: any, name: string, descriptor: any) {
        const original = descriptor.value;

        if (typeof original === 'function') {
            routers.push({
                controller: target,
                key: name,
                ...props
            })
        }
    }
}