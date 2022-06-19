import { DefaultContext } from 'koa'
import { IResponseCtx } from '../plugins/pd-response'
export type IBaseContext = DefaultContext & IResponseCtx