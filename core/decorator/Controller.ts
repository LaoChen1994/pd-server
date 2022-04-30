import { IMiddleware } from 'koa-router';
import BaseController from '../app/controller'
export interface IRouteController {
    prefix?: string
    [key: string]: any
}

export interface IRequestMapping {
    method: "get" | "post" | "put" | "delete" | "options" | "patch";
    url: string;
    name?: string;
    handler?: IMiddleware
}

export interface IAppRoute extends IRequestMapping {
    constructor: IRouteController;
    key: string
}

const routers: IAppRoute[] = [];

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
                constructor: target.constructor,
                key: name,
                handler: target[name],
                ...props
            })
        }
    }
}

export function getRoutes() {
    return routers
}